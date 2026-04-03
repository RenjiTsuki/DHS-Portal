let currentUser = null;

/* =========================
   AUTH
========================= */

function login() {
  const id = document.getElementById("agentIdInput").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users"));

  // Create default users if none exist
  if (!users || users.length === 0) {
    users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "agent1", password: "agent123", role: "agent" }
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }

  const user = users.find(u => u.username === id && u.password === password);

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

function checkAuth(requiredRole = null) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location = "index.html";
    return;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied");
    window.location = "dashboard.html";
  }

  currentUser = user;
}

/* =========================
   USERS (ADMIN)
========================= */

function createUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;
  const role = document.getElementById("role").value;

  users.push({ username, password, role });

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  list.innerHTML = "";

  users.forEach((u, index) => {
    list.innerHTML += `
      <div class="card">
        <b>${u.username}</b> (${u.role})

        <button onclick="deleteUser(${index})">Delete</button>
      </div>
    `;
  });
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

/* =========================
   CASES
========================= */

let cases = JSON.parse(localStorage.getItem("cases")) || [];

function createCase() {
  const title = document.getElementById("caseTitle").value;
  const desc = document.getElementById("caseDesc").value;
  const link = document.getElementById("caseLink").value;

  cases.push({
    id: Date.now(),
    title,
    desc,
    link,
    assignedTo: "Unassigned",
    status: "Open"
  });

  localStorage.setItem("cases", JSON.stringify(cases));

  loadCases();
}

function loadCases() {
  const container = document.getElementById("caseList");
  if (!container) return;

  cases = JSON.parse(localStorage.getItem("cases")) || [];

  container.innerHTML = "";

  cases.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <p><b>Status:</b> ${c.status}</p>
        <p><b>Assigned:</b> ${c.assignedTo}</p>

        ${c.link ? `<a href="${c.link}" target="_blank">Evidence Link</a>` : ""}

        <select onchange="assignAgent(${c.id}, this.value)">
          <option>Assign Agent</option>
          <option value="agent1">agent1</option>
          <option value="agent2">agent2</option>
        </select>

        <button onclick="openCase(${c.id})">Open</button>
      </div>
    `;
  });
}

function assignAgent(id, agent) {
  const c = cases.find(c => c.id === id);

  if (c) {
    c.assignedTo = agent;

    localStorage.setItem("cases", JSON.stringify(cases));

    loadCases();
  }
}

function openCase(id) {
  localStorage.setItem("currentCase", id);
  window.location = "case.html";
}

/* =========================
   CASE DETAIL PAGE
========================= */

function loadCase() {
  const id = localStorage.getItem("currentCase");

  cases = JSON.parse(localStorage.getItem("cases")) || [];

  const c = cases.find(c => c.id == id);

  if (!c) return;

  document.getElementById("caseDetails").innerHTML = `
    <div class="card">
      <h2>${c.title}</h2>
      <p>${c.desc}</p>
      <p><b>Status:</b> ${c.status}</p>
      <p><b>Assigned:</b> ${c.assignedTo}</p>

      ${c.link ? `<a href="${c.link}" target="_blank">Evidence</a>` : ""}
    </div>
  `;
}

function updateStatus(status) {
  const id = localStorage.getItem("currentCase");

  const c = cases.find(c => c.id == id);

  if (c) {
    c.status = status;

    localStorage.setItem("cases", JSON.stringify(cases));

    loadCase();
  }
}
