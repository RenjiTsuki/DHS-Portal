/* LOGIN */
function login() {
  const u = username.value;
  const p = password.value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(x => x.username === u && x.password === p);

  if (!user) return error.innerText = "Invalid login";

  localStorage.setItem("user", JSON.stringify(user));
  location = "dashboard.html";
}

function checkAuth() {
  if (!localStorage.getItem("user")) location = "index.html";
}

function logout() {
  localStorage.clear();
  location = "index.html";
}

/* DASHBOARD */
function loadDashboard() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  userCount.innerText = users.length;
  caseCount.innerText = cases.length;
  activeCases.innerText = cases.filter(c => c.status !== "Closed").length;

  let ann = JSON.parse(localStorage.getItem("announcements")) || [];

  announcements.innerHTML = ann.map(a =>
    `<p>${a.date} - ${a.text}</p>`
  ).join("");
}

function addAnnouncement() {
  let ann = JSON.parse(localStorage.getItem("announcements")) || [];

  ann.unshift({
    text: announcementText.value,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("announcements", JSON.stringify(ann));
  loadDashboard();
}

/* USERS */
function createUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    username: newUser.value,
    password: newPass.value,
    role: role.value,
    warnings: []
  });

  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function loadUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  userList.innerHTML = users.map((u,i)=>`
    <tr>
      <td>${u.username}</td>
      <td>${u.role}</td>
      <td>${u.warnings.length}</td>
      <td>
        <button onclick="addWarning(${i})">Warn</button>
        <button onclick="deleteUser(${i})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function deleteUser(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  users.splice(i,1);
  localStorage.setItem("users",JSON.stringify(users));
  loadUsers();
}

function addWarning(i) {
  let users = JSON.parse(localStorage.getItem("users"));
  users[i].warnings.push({text:"Warning",date:new Date()});
  localStorage.setItem("users",JSON.stringify(users));
}

/* ROLES */
function createRole() {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];

  roles.push({
    name: roleName.value
  });

  localStorage.setItem("roles", JSON.stringify(roles));
  loadRoles();
}

function loadRoles() {
  let roles = JSON.parse(localStorage.getItem("roles")) || [];

  role.innerHTML = roles.map(r =>
    `<option>${r.name}</option>`
  ).join("");

  roleList.innerHTML = roles.map(r =>
    `<p>${r.name}</p>`
  ).join("");
}

/* CASES */
function createCase() {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  cases.push({
    id: Date.now(),
    title: caseTitle.value,
    desc: caseDesc.value,
    status: "Open",
    assignedUsers: []
  });

  localStorage.setItem("cases", JSON.stringify(cases));
  loadCases();
}

function loadCases() {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];

  caseList.innerHTML = cases.map(c=>`
    <div class="card">
      <h3>${c.title}</h3>
      <p>${c.status}</p>
      <button onclick="openCase(${c.id})">Open</button>
    </div>
  `).join("");
}

function openCase(id) {
  localStorage.setItem("caseId", id);
  location = "case.html";
}

function loadCase() {
  let cases = JSON.parse(localStorage.getItem("cases")) || [];
  let id = localStorage.getItem("caseId");

  let c = cases.find(x=>x.id==id);

  case.innerHTML = `
    <input id="title" value="${c.title}">
    <textarea id="desc">${c.desc}</textarea>

    <button onclick="saveCase(${id})">Save</button>
  `;
}

function saveCase(id) {
  let cases = JSON.parse(localStorage.getItem("cases"));

  let c = cases.find(x=>x.id==id);

  c.title = title.value;
  c.desc = desc.value;

  localStorage.setItem("cases", JSON.stringify(cases));
}
