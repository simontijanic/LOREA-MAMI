const randomizeButton = document.getElementById('randomize-winner');
const winnerSpan = document.getElementById('winner');
const rows = document.querySelectorAll('tbody tr');

fetch("/api/submissions")
  .then((response) => response.json())
  .then((data) => {
    const labels = data.map((item) => `Day ${item.day}`);
    const counts = data.map((item) => item.count);

    const ctx = document.getElementById("submissionsChart").getContext("2d");
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
  })
.catch((err) => console.error("Error fetching chart data:", err));

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-icon').forEach(icon => {
      icon.addEventListener('click', async (event) => {
        const row = event.target.closest('tr');
        const id = row.dataset.id;

        if (confirm('Are you sure you want to delete this submission?')) {
          try {
            const response = await fetch(`/api/submissions/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              row.remove();
              alert('Submission deleted successfully');
            } else {
              alert('Error deleting submission');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error deleting submission');
          }
        }
      });
    });
});

randomizeButton.addEventListener('click', () => {
      if (rows.length > 0) {
          const randomIndex = Math.floor(Math.random() * rows.length);
          const winnerRow = rows[randomIndex];
          const winnerEmail = winnerRow.querySelector('td:nth-child(1)').textContent;
          const winnerAnswer = winnerRow.querySelector('td:nth-child(2)').textContent;
          winnerSpan.textContent = `${winnerEmail} - ${winnerAnswer}`;
      } else {
          winnerSpan.textContent = 'No submissions available';
      }
});
