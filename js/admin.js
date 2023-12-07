window.addEventListener('load', function () {
  history.pushState(null, null, window.location.href);  
  window.addEventListener('popstate', function () {
      window.location.href = 'login.html';
  });

  // Update calls for all users and then fetch user information
  updateCallsForAllUsers();
});

function updateCallsForAllUsers() {
  fetch("https://projectarchitecturebackend.onrender.com/updateAllCalls", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      }
  })
  .then((response) => response.json())
  .then(() => {
      fetchAndUpdateUsers(); // Fetch and update user information
      fetchAndUpdateApiCalls(); // Refresh the API calls table
      fetchAndUpdateEpCalls(); // Fetch and update endpoint calls
  })
  .catch((error) => console.error("Error updating calls for all users:", error));
}

function fetchAndUpdateUsers() {
  fetch("https://projectarchitecturebackend.onrender.com/get-all-users")
      .then((response) => response.json())
      .then((users) => {
          const tableBody = document.getElementById("userTableBody");
          users.forEach((user) => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              const cell3 = row.insertCell(2);
              cell1.textContent = user.username;
              cell2.textContent = user.email;

              const deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.addEventListener("click", () => handleDelete(user.username));
              cell3.appendChild(deleteButton);
          });
      })
      .catch((error) => console.error("Error fetching user information:", error));
}

function fetchAndUpdateApiCalls() {
  fetch("https://projectarchitecturebackend.onrender.com/get-calls")
      .then((response) => response.json())
      .then((users) => {
          const tableBody = document.getElementById("apiTableBody");
          tableBody.innerHTML = ''; // Clear existing rows
          users.forEach((user) => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              cell1.textContent = user.username;
              cell2.textContent = user.api_calls;
          });
      })
      .catch((error) => console.error("Error fetching API information:", error));
}

function fetchAndUpdateEpCalls() {
  fetch("https://projectarchitecturebackend.onrender.com/get-ep")
      .then((response) => response.json())
      .then((users) => {
          const tableBody = document.getElementById("epTableBody");
          tableBody.innerHTML = ''; // Clear existing rows
          users.forEach((user) => {
              const row = tableBody.insertRow();
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              const cell3 = row.insertCell(2);
              const cell4 = row.insertCell(3);
              const cell5 = row.insertCell(4);
              const cell6 = row.insertCell(5);
              cell1.textContent = user.username;
              cell2.textContent = user.descAnalysis;
              cell3.textContent = user.resumeFeedback;
              cell4.textContent = user.jobFeedback;
              cell5.textContent = user.calls;
              cell6.textContent = user.login;
          });
      })
      .catch((error) => console.error("Error fetching endpoint call information:", error));
}

function handleDelete(username) {
  const confirmDelete = confirm(`Are you sure you want to delete the user ${username}?`);
  if (confirmDelete) {
      fetch(`https://projectarchitecturebackend.onrender.com/users/${username}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data.message);
          location.reload();
      })
      .catch((error) => console.error("Error deleting user:", error));
  }
}
