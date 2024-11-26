class SubmissionsManager {
  constructor(apiUrl, chartElementId, deleteSelector, randomButton, winnerSpan) {
    this.apiUrl = apiUrl;
    this.chartElementId = chartElementId;
    this.deleteSelector = deleteSelector;
    this.randomButton = randomButton;
    this.winnerSpan = winnerSpan;
    this.rows = [];
  }

  async fetchAndRenderChart() {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.renderChart(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }

  renderChart(data) {
    const labels = data.map((item) => `Day ${item.day}`);
    const counts = data.map((item) => item.count);

    const ctx = document.getElementById(this.chartElementId).getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Submissions",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  initializeDeleteHandlers() {
    document.querySelectorAll(this.deleteSelector).forEach((icon) => {
      icon.addEventListener("click", (event) => this.handleDelete(event));
    });
  }

  async handleDelete(event) {
    const row = event.target.closest("tr");
    const id = row.dataset.id;

    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        const response = await fetch(`${this.apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          row.remove();
          alert("Submission deleted successfully");
        } else {
          alert("Error deleting submission");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error deleting submission");
      }
    }
  }

  randomizeWinner() {
    if (this.rows.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.rows.length);
      const winnerRow = this.rows[randomIndex];
      const winnerEmail = winnerRow.querySelector("td:nth-child(1)").textContent;
      const winnerAnswer = winnerRow.querySelector("td:nth-child(2)").textContent;
      this.winnerSpan.textContent = `${winnerEmail} - ${winnerAnswer}`;
    } else {
      this.winnerSpan.textContent = "No submissions available";
    }
  }

  setupEventListeners() {
    if (this.randomButton) {
      this.randomButton.addEventListener("click", () => this.randomizeWinner());
    }
  }

  async initialize() {
    await this.fetchAndRenderChart();
    this.initializeDeleteHandlers();
    this.setupEventListeners();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const submissionsManager = new SubmissionsManager(
    "/api/submissions",
    "submissionsChart",
    ".delete-icon",
    document.getElementById("randomize-winner"),
    document.getElementById("winner-section")
  );

  submissionsManager.rows = Array.from(document.querySelectorAll("tr[data-id]"));

  submissionsManager.initialize();
});