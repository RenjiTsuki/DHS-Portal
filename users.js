<!DOCTYPE html>
<html>
<head>
  <title>User Management</title>
  <link rel="stylesheet" href="style.css">
</head>

<body onload="checkLogin(); loadUsers();">

  <div class="topbar">
    <span class="menu-btn" onclick="toggleMenu()">☰</span>
    User Management
  </div>

  <div class="sidebar" id="sidebar">
    <button onclick="window.location='dashboard.html'">Dashboard</button>
    <button onclick="window.location='cases.html'">Cases</button>
    <button onclick="window.location='users.html'">User Management</button>
    <button onclick="logout()">Logout</button>
  </div>

  <div class="container">

    <div class="card">
      <h3>Create User</h3>

      <input id="newAgentId" placeholder="Agent ID">
      <input id="newPassword" type="password" placeholder="Password">

      <select id="newRole">
        <option value="agent">Agent</option>
        <option value="admin">Inspector General</option>
      </select>

      <button onclick="createUser()">Create</button>
    </div>

    <div class="card">
      <h3>Users</h3>
      <div id="userList"></div>
    </div>

  </div>

  <script src="app.js"></script>

</body>
</html>
