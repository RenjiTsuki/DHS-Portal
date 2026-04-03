function login() {
  const agentId = document.getElementById("agentIdInput").value;
  const password = document.getElementById("password").value;

  const user = usersList.find(
    u => u.agentId === agentId && u.password === password
  );

  if (!user) {
    document.getElementById("error").innerText = "Invalid login";
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  window.location = "dashboard.html";
}

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location = "index.html";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location = "index.html";
}

function createUser() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser || currentUser.role !== "admin") {
    alert("Only admin can create users");
    return;
  }

  const agentId = document.getElementById("newAgentId").value;
  const password = document.getElementById("newPassword").value;

  usersList.push({
    agentId,
    password,
    role: "agent"
  });

  alert("User created (temporary)");
}
