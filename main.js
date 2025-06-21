// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {

  // Helper function to show a confirmation message
  function showAlert(message) {
    alert(message);
  }

  // Handle deposit form
  const depositForm = document.getElementById('depositForm');
  if (depositForm) {
    depositForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const amount = document.getElementById('amount').value;
      if (amount <= 0) {
        showAlert("Please enter a valid deposit amount.");
      } else {
        showAlert($${amount} deposited successfully.);
        depositForm.reset();
      }
    });
  }

  // Handle withdraw form
  const withdrawForm = document.getElementById('withdrawForm');
  if (withdrawForm) {
    withdrawForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const amount = document.getElementById('amount').value;
      if (amount <= 0) {
        showAlert("Please enter a valid withdrawal amount.");
      } else {
        showAlert($${amount} withdrawn successfully.);
        withdrawForm.reset();
      }
    });
  }

  // Handle transfer form
  const transferForm = document.getElementById('transferForm');
  if (transferForm) {
    transferForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const recipient = document.getElementById('recipient').value;
      const amount = document.getElementById('amount').value;

      if (!recipient || amount <= 0) {
        showAlert("Please enter valid recipient and amount.");
      } else {
        showAlert($${amount} transferred to ${recipient} successfully.);
        transferForm.reset();
      }
    });
  }

  // (Optional) Handle login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (!username || !password) {
        showAlert("Please enter username and password.");
      } else {
        // Simulate login
        showAlert("Login successful.");
        loginForm.reset();
        window.location.href = 'dashboard.html'; // Redirect to dashboard
      }
    });
  }

  // (Optional) Handle register form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!username || !email || !password) {
        showAlert("Please fill all fields.");
      } else {
        showAlert("Registration successful. You can now log in.");
        registerForm.reset();
        window.location.href = 'login.html';
      }
    });
  }

});
