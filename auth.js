// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Handle Register Form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      // Save user to localStorage
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[username]) {
        alert("Username already exists. Please choose another.");
        return;
      }

      users[username] = {
        email: email,
        password: password,
        balance: 0,
        transactions: []
      };

      localStorage.setItem('users', JSON.stringify(users));
      alert("Registration successful! You can now log in.");
      registerForm.reset();
      window.location.href = 'login.html';
    });
  }

  // Handle Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      const users = JSON.parse(localStorage.getItem('users')) || {};

      if (!users[username]) {
        alert("User not found.");
        return;
      }

      if (users[username].password !== password) {
        alert("Incorrect password.");
        return;
      }

      // Set session
      localStorage.setItem('loggedInUser', username);
      alert("Login successful!");
      window.location.href = 'dashboard.html';
    });
  }

});
