/* =========================
   AUTH SYSTEM
========================= */

function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!usernameInput || !passwordInput) {
    alert("Login inputs not found");
    return;
  }

  const u = usernameInput.value;
  const p = passwordInput.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(x => x.username === u && x.password === p);

  if (!user) {
    document.getElementById("error").innerText = "Invalid login";
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  window.location = "dashboard.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location = "index.html";
}

function checkAuth(role = null) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location = "index.html";
    return;
  }

  if (role && user.role !== role) {
    alert("Access denied");
    window.location = "dashboard.html";
  }
}
