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

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function checkLogin() {
  if (!getUser()) {
    window.location = "index.html";
  }
}

function logout() {
  localStorage.removeItem("user");
  window.location = "index.html";
}

/* ---------------- CASES ---------------- */

function getCases() {
  return JSON.parse(localStorage.getItem("cases")) || [];
}

function saveCases(cases) {
  localStorage.setItem("cases", JSON.stringify(cases));
}

function createCase() {
  const user = getUser();

  if (user.role !== "admin") {
    alert("Only admin can create cases");
    return;
  }

  const title = document.getElementById("caseTitle").value;
  const desc = document.getElementById("caseDesc").value;

  const cases = getCases();

  cases.push({
    id: Date.now(),
    title,
    desc,
    status: "OPEN"
  });

  saveCases(cases);
  loadCases();
}

function loadCases(filter = "") {
  const cases = getCases();
  const container = document.getElementById("caseList");

  container.innerHTML = "";

  cases
    .filter(c => c.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      container.innerHTML += `
        <div class="card">
          <h3>${c.title}</h3>
          <p>${c.desc}</p>
          <p>Status: ${c.status}</p>
        </div>
      `;
    });
}
