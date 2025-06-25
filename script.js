// script.js

// Get current user
const user = JSON.parse(localStorage.getItem("currentUser"));

// Redirect if not logged in
if (!user) {
  alert("You're not logged in!");
  window.location.href = "auth.html";
} else {
  // Show name on dashboard
  document.getElementById("username").textContent = user.username;
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully!");
  window.location.href = "auth.html";
});
// Dummy data: problems solved over last 7 days
const progressData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [{
    label: 'Problems Solved',
    data: [3, 5, 2, 4, 6, 1, 3],  // You can later load this from localStorage
    fill: true,
    borderColor: '#a66cff',
    backgroundColor: 'rgba(166, 108, 255, 0.1)',
    tension: 0.4
  }]
};

const config = {
  type: 'line',
  data: progressData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#eaeaea',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      },
      y: {
        ticks: { color: '#ccc' },
        grid: { color: '#333' }
      }
    }
  }
};

// Render chart
const ctx = document.getElementById('progressChart').getContext('2d');
new Chart(ctx, config);

function generateHeatmap() {
  const heatmap = document.getElementById("heatmap");
  const daysToShow = 84; // ~3 months (12 weeks)
  for (let i = 0; i < daysToShow; i++) {
    const div = document.createElement("div");
    div.classList.add("heatmap-day");

    // Simulate solved count randomly (0–4 problems)
    const problems = Math.floor(Math.random() * 5);

    if (problems === 1) div.classList.add("level-1");
    else if (problems === 2) div.classList.add("level-2");
    else if (problems === 3) div.classList.add("level-3");
    else if (problems >= 4) div.classList.add("level-4");

    div.title = `${problems} problems`;
    heatmap.appendChild(div);
  }
}

generateHeatmap();
