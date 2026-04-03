// LOGIN FUNCTION
function login() {
  const agentId = document.getElementById("agentIdInput").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  // Get users from users.js OR localStorage
  let users = [];

  // If users exist in localStorage, use them
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  } else if (typeof usersList !== "undefined") {
    // fallback to users.js
    users = usersList;
  }

  // Find matching user
  const user = users.find(
    u => u.agentId === agentId && u.password === password
  );

  if (!user) {
    error.innerText = "Invalid Agent ID or Password";
    return;
  }

  // Save session
  localStorage.setItem("role", user.role);
  localStorage.setItem("agentId", user.agentId);

  // Redirect
  window.location = "dashboard.html";
}


// CHECK LOGIN (use this on other pages)
function checkLogin() {
  const role = localStorage.getItem("role");

  if (!role) {
    window.location = "index.html";
  }
}


// CREATE USER (ADMIN ONLY)
function createUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  const agentId = document.getElementById("newAgentId").value;

  const role = "agent"; // default role

  users.push({
    email,
    password,
    agentId,
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("User created!");
}


// LOGOUT
function logout() {
  localStorage.clear();
  window.location = "index.html";
}