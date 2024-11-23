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