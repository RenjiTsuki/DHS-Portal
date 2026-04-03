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
   ROLES SYSTEM
========================= */

function createRole() {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];

  const name = document.getElementById("roleName").value;

  // get selected permissions
  const permissions = Array.from(
    document.querySelectorAll(".perm:checked")
  ).map(p => p.value);

  if (!name) {
    alert("Role name required");
    return;
  }

  roles.push({ name, permissions });

  localStorage.setItem("roles", JSON.stringify(roles));

  loadRoles();
}

function loadRoles() {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];
  const list = document.getElementById("roleList");

  if (!list) return;

  list.innerHTML = "";

  roles.forEach((r, i) => {
    list.innerHTML += `
      <div class="card">
        <b>${r.name}</b>
        <p>${r.permissions.join(", ")}</p>
        <button onclick="deleteRole(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteRole(i) {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];
  roles.splice(i, 1);
  localStorage.setItem("roles", JSON.stringify(roles));
  loadRoles();
}

/* =========================
   USERS SYSTEM
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

  users.push({
    username,
    password,
    role,
    warnings: [],
    notes: ""
  });

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  list.innerHTML = "";

  users.forEach((u, i) => {
    list.innerHTML += `
      <div class="card">
        <b>${u.username}</b> (${u.role})

        <br><br>

        <input id="editUser${i}" value="${u.username}">
        <input id="editPass${i}" value="${u.password}">

        <select id="editRole${i}">
          ${getRoleOptions(u.role)}
        </select>

        <button onclick="updateUser(${i})">Update</button>
        <button onclick="deleteUser(${i})">Delete</button>
      </div>
    `;
  });
}

function getRoleOptions(current) {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];

  let options = "";

  roles.forEach(r => {
    options += `<option value="${r.name}" ${r.name === current ? "selected" : ""}>${r.name}</option>`;
  });

  return options;
}

function updateUser(i) {
  let users = JSON.parse(localStorage.getItem("users"));

  users[i].username = document.getElementById(`editUser${i}`).value;
  users[i].password = document.getElementById(`editPass${i}`).value;
  users[i].role = document.getElementById(`editRole${i}`).value;

  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function deleteUser(i) {
  let users = JSON.parse(localStorage.getItem("users"));

  users.splice(i, 1);

  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

/* =========================
   CASES SYSTEM
========================= */

function assignUserToCase(caseId, username) {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  let c = cases.find(x => x.id == caseId);

  if (!c.assignedUsers) c.assignedUsers = [];

  if (!c.assignedUsers.includes(username)) {
    c.assignedUsers.push(username);
  }

  localStorage.setItem("cases", JSON.stringify(cases));
}

function removeUserFromCase(caseId, username) {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  let c = cases.find(x => x.id == caseId);

  c.assignedUsers = c.assignedUsers.filter(u => u !== username);

  localStorage.setItem("cases", JSON.stringify(cases));
}

/* =========================
   WARNINGS
========================= */

function addWarning(i) {
  let users = JSON.parse(localStorage.getItem("users"));

  const text = prompt("Enter warning:");

  users[i].warnings.push({
    text,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("users", JSON.stringify(users));
}

/* =========================
   ANNOUNCEMENTS
========================= */

function addAnnouncement() {
  let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

  const text = document.getElementById("announcementText").value;

  announcements.unshift({
    text,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("announcements", JSON.stringify(announcements));
}
