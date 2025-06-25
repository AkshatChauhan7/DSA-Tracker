const container = document.getElementById("form-container");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// Form DOM elements
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

// Switch forms
showRegister.addEventListener("click", () => {
  container.classList.add("slide-left");
});

showLogin.addEventListener("click", () => {
  container.classList.remove("slide-left");
});

// Helper: Get input values
function getInputValues(form) {
  const inputs = form.querySelectorAll("input");
  const values = {};
  inputs.forEach(input => values[input.placeholder.toLowerCase()] = input.value.trim());
  return values;
}

// Register Form Submit
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { username, email, password } = getInputValues(registerForm);

  if (!username || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(user => user.email === email)) {
    alert("User already exists!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please log in.");
  container.classList.remove("slide-left");
});

// Login Form Submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { username, password } = getInputValues(loginForm);

  if (!username || !password) {
    alert("Please enter both fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matched = users.find(user => user.username === username && user.password === password);

  if (!matched) {
    alert("Invalid credentials!");
    return;
  }

  alert(`Welcome back, ${matched.username}!`);
  localStorage.setItem("currentUser", JSON.stringify(matched));
  window.location.href = "index.html"; // Redirect to dashboard
});
