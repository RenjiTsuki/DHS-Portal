/* =========================
   DEFAULT USER SETUP
========================= */
(function initDefaultUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!users.some(u => u.username === "IG01")) {
    users.push({
      username: "IG01",
      password: "alphacharliezulu",
      role: "admin",
      notes: "",
      warnings: 0
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
})();

/* =========================
   AUTH SYSTEM
========================= */
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

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

/* =========================
   USER MANAGEMENT
========================= */
function createUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;
  const role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  if (users.some(u => u.username === username)) {
    alert("User already exists");
    return;
  }

  users.push({
    username,
    password,
    role,
    notes: "",
    warnings: 0
  });

  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  list.innerHTML = "";

  users.forEach((u, i) => {
    list.innerHTML += `
      <tr>
        <td>${u.username}</td>
        <td><span class="badge ${u.role}">${u.role}</span></td>
        <td>${u.warnings}</td>
        <td>
          <button onclick="viewProfile(${i})">Profile</button>
          <button onclick="deleteUser(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteUser(i) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(i, 1);
  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

/* =========================
   PROFILE SYSTEM
========================= */
function viewProfile(i) {
  localStorage.setItem("profileIndex", i);
  window.location = "profile.html";
}

function loadProfile() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const i = localStorage.getItem("profileIndex");
  const u = users[i];

  document.getElementById("profile").innerHTML = `
    <h2>${u.username}</h2>
    <p>Role: ${u.role}</p>
    <p class="warning">Warnings: ${u.warnings}</p>

    <textarea id="notes">${u.notes}</textarea>

    <button onclick="saveNotes(${i})">Save Notes</button>
    <button onclick="addWarning(${i})">Add Warning</button>
  `;
}

function saveNotes(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[i].notes = document.getElementById("notes").value;
  localStorage.setItem("users", JSON.stringify(users));
}

function addWarning(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[i].warnings++;
  localStorage.setItem("users", JSON.stringify(users));
  loadProfile();
}

/* =========================
   CASE SYSTEM
========================= */
function createCase() {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  cases.push({
    id: Date.now(),
    title: document.getElementById("caseTitle").value,
    desc: document.getElementById("caseDesc").value,
    assigned: "Unassigned",
    status: "Open",
    notes: ""
  });

  localStorage.setItem("cases", JSON.stringify(cases));
  loadCases();
}

function loadCases() {
  const list = document.getElementById("caseList");
  if (!list) return;

  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  list.innerHTML = "";

  cases.forEach(c => {
    list.innerHTML += `
      <div class="case-card">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <p><b>Status:</b> ${c.status}</p>
        <p><b>Assigned:</b> ${c.assigned}</p>

        <input placeholder="Assign agent..." onchange="assign(${c.id}, this.value)">

        <select onchange="changeStatus(${c.id}, this.value)">
          <option ${c.status === "Open" ? "selected" : ""}>Open</option>
          <option ${c.status === "Investigating" ? "selected" : ""}>Investigating</option>
          <option ${c.status === "Closed" ? "selected" : ""}>Closed</option>
        </select>

        <button onclick="openCase(${c.id})">Open</button>
      </div>
    `;
  });
}

function assign(id, agent) {
  let cases = JSON.parse(localStorage.getItem("cases"));
  let c = cases.find(x => x.id === id);
  c.assigned = agent;
  localStorage.setItem("cases", JSON.stringify(cases));
}

function changeStatus(id, status) {
  let cases = JSON.parse(localStorage.getItem("cases"));
  let c = cases.find(x => x.id === id);
  c.status = status;
  localStorage.setItem("cases", JSON.stringify(cases));
}

function openCase(id) {
  localStorage.setItem("caseId", id);
  window.location = "case.html";
}

function loadCase() {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];
  const id = localStorage.getItem("caseId");

  const c = cases.find(x => x.id == id);

  document.getElementById("case").innerHTML = `
    <h2>${c.title}</h2>
    <p>${c.desc}</p>

    <textarea id="caseNotes">${c.notes}</textarea>
    <button onclick="saveCaseNotes(${id})">Save Notes</button>
  `;
}

function saveCaseNotes(id) {
  let cases = JSON.parse(localStorage.getItem("cases"));
  let c = cases.find(x => x.id == id);

  c.notes = document.getElementById("caseNotes").value;

  localStorage.setItem("cases", JSON.stringify(cases));
}
