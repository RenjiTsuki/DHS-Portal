function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [
    { agentId: "admin", password: "admin123", role: "admin" }
  ];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCases() {
  return JSON.parse(localStorage.getItem("cases")) || [];
}

function saveCases(cases) {
  localStorage.setItem("cases", JSON.stringify(cases));
}

/* LOGIN */
function login() {
  const id = document.getElementById("agentIdInput").value;
  const pw = document.getElementById("password").value;

  const users = getUsers();

  const user = users.find(u => u.agentId === id && u.password === pw);

  if (!user) {
    document.getElementById("error").innerText = "Invalid login";
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
  window.location = "dashboard.html";
}

/* AUTH */
function checkLogin() {
  if (!getUser()) {
    window.location = "index.html";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location = "index.html";
}

/* SIDEBAR */
function toggleMenu() {
  const s = document.getElementById("sidebar");
  s.style.left = s.style.left === "0px" ? "-260px" : "0px";
}

/* USERS */
function createUser() {
  const current = getUser();

  if (!current || current.role !== "admin") {
    alert("Access denied");
    return;
  }

  const users = getUsers();

  users.push({
    agentId: document.getElementById("newAgentId").value,
    password: document.getElementById("newPassword").value,
    role: document.getElementById("newRole").value
  });

  saveUsers(users);
  loadUsers();
}

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  const users = getUsers();

  list.innerHTML = "";

  users.forEach((u, i) => {
    list.innerHTML += `
      <div class="card">
        <b>${u.agentId}</b> (${u.role})

        <br><br>
        <button onclick="editUser(${i})">Edit</button>
        <button onclick="deleteUser(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteUser(i) {
  let users = getUsers();
  users.splice(i, 1);
  saveUsers(users);
  loadUsers();
}

function editUser(i) {
  let users = getUsers();
  const newRole = prompt("Role (admin / agent):", users[i].role);

  if (newRole) {
    users[i].role = newRole;
    saveUsers(users);
    loadUsers();
  }
}

/* CASES */
function createCase() {
  const current = getUser();

  if (!current || current.role !== "admin") {
    alert("Only admin can create cases");
    return;
  }

  let cases = getCases();

  cases.push({
    id: Date.now(),
    title: document.getElementById("caseTitle").value,
    desc: document.getElementById("caseDesc").value,
    status: "OPEN"
  });

  saveCases(cases);
  loadCases();
}

function loadCases(filter = "") {
  const list = document.getElementById("caseList");
  if (!list) return;

  let cases = getCases();

  list.innerHTML = "";

  cases
    .filter(c => c.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((c, i) => {
      list.innerHTML += `
        <div class="card">
          <b>${c.title}</b>
          <p>${c.desc}</p>
          <p>Status: ${c.status}</p>

          <button onclick="updateStatus(${i}, 'OPEN')">Open</button>
          <button onclick="updateStatus(${i}, 'INVESTIGATING')">Investigating</button>
          <button onclick="updateStatus(${i}, 'CLOSED')">Closed</button>

          <button onclick="deleteCase(${i})">Delete</button>
        </div>
      `;
    });
}

function updateStatus(i, status) {
  let cases = getCases();
  cases[i].status = status;
  saveCases(cases);
  loadCases();
}

function deleteCase(i) {
  let cases = getCases();
  cases.splice(i, 1);
  saveCases(cases);
  loadCases();
}

/* DASHBOARD */
function loadStats() {
  const cases = getCases();

  stats.innerHTML = `
    <div class="card">Total: ${cases.length}</div>
    <div class="card">Open: ${cases.filter(c=>c.status==="OPEN").length}</div>
    <div class="card">Investigating: ${cases.filter(c=>c.status==="INVESTIGATING").length}</div>
    <div class="card">Closed: ${cases.filter(c=>c.status==="CLOSED").length}</div>
  `;
}
