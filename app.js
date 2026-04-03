// DEFAULT USERS SETUP
(function initDefaultUsers() {
  let users = JSON.parse(localStorage.getItem("users"));

  if (!users) {
    users = [];

    users.push({
      username: "IG01",
      password: "alphacharliezulu",
      role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
})();
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
    role
  });

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

/* LOAD + SEARCH USERS */

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const search = document.getElementById("searchUser")?.value?.toLowerCase() || "";

  users = users.filter(u =>
    u.username.toLowerCase().includes(search)
  );

  list.innerHTML = "";

  users.forEach((u, index) => {
    list.innerHTML += `
      <div class="card">
        <b>${u.username}</b> (${u.role})

        <br><br>

        <input value="${u.username}" id="editUser${index}" />
        <input value="${u.password}" id="editPass${index}" />

        <select id="editRole${index}">
          <option value="agent" ${u.role === "agent" ? "selected" : ""}>Agent</option>
          <option value="admin" ${u.role === "admin" ? "selected" : ""}>Admin</option>
        </select>

        <button onclick="updateUser(${index})">Update</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </div>
    `;
  });
}

/* UPDATE USER */

function updateUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const username = document.getElementById(`editUser${index}`).value;
  const password = document.getElementById(`editPass${index}`).value;
  const role = document.getElementById(`editRole${index}`).value;

  users[index] = { username, password, role };

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

/* DELETE USER */

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}
