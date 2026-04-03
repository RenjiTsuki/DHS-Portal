/* =========================
   DEFAULT USER SETUP
========================= */

(function initDefaultUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some(u => u.username === "IG01");

  if (!exists) {
    users.push({
      username: "IG01",
      password: "alphacharliezulu",
      role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
})();

/* =========================
   CREATE USER
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

  // Prevent duplicate usernames
  if (users.some(u => u.username === username)) {
    alert("User already exists");
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

/* =========================
   LOAD + SEARCH USERS
========================= */

function loadUsers() {
  const list = document.getElementById("userList");
  if (!list) return;

  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const search = document.getElementById("searchUser")?.value?.toLowerCase() || "";

  const filteredUsers = allUsers.filter(u =>
    u.username.toLowerCase().includes(search)
  );

  list.innerHTML = "";

  filteredUsers.forEach(u => {

    // Get REAL index from full array
    const realIndex = allUsers.findIndex(x => x.username === u.username);

    list.innerHTML += `
      <div class="card">
        <b>${u.username}</b> (${u.role})

        <br><br>

        <input value="${u.username}" id="editUser${realIndex}" />
        <input value="${u.password}" id="editPass${realIndex}" />

        <select id="editRole${realIndex}">
          <option value="agent" ${u.role === "agent" ? "selected" : ""}>Agent</option>
          <option value="admin" ${u.role === "admin" ? "selected" : ""}>Admin</option>
        </select>

        <button onclick="updateUser(${realIndex})">Update</button>
        <button onclick="deleteUser(${realIndex})">Delete</button>
      </div>
    `;
  });
}

/* =========================
   UPDATE USER
========================= */

function updateUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const username = document.getElementById(`editUser${index}`).value;
  const password = document.getElementById(`editPass${index}`).value;
  const role = document.getElementById(`editRole${index}`).value;

  // Prevent duplicate usernames on update
  if (users.some((u, i) => u.username === username && i !== index)) {
    alert("Username already in use");
    return;
  }

  users[index] = { username, password, role };

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}

/* =========================
   DELETE USER
========================= */

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!confirm("Are you sure you want to delete this user?")) return;

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
}
