document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('loggedInUser');
  if (!user) {
    alert("Please log in to access this page.");
    window.location.href = "login.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  const currentUser = users[user];

  // Helper to update user data
  function updateUserData() {
    users[user] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }

  // ===============================
  // Deposit Form Handling
  // ===============================
  const depositForm = document.getElementById('depositForm');
  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('amount').value);
      const note = document.getElementById('note').value;

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      currentUser.balance += amount;
      currentUser.transactions.push({
        type: "Deposit",
        amount,
        note,
        date: new Date().toLocaleString()
      });

      updateUserData();
      alert($${amount} deposited successfully.);
      depositForm.reset();
    });
  }

  // ===============================
  // Withdraw Form Handling
  // ===============================
  const withdrawForm = document.getElementById('withdrawForm');
  if (withdrawForm) {
    withdrawForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('amount').value);
      const note = document.getElementById('note').value;

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      if (currentUser.balance < amount) {
        alert("Insufficient balance.");
        return;
      }

      currentUser.balance -= amount;
      currentUser.transactions.push({
        type: "Withdraw",
        amount,
        note,
        date: new Date().toLocaleString()
      });

      updateUserData();
      alert($${amount} withdrawn successfully.);
      withdrawForm.reset();
    });
  }

  // ===============================
  // Transfer Form Handling
  // ===============================
  const transferForm = document.getElementById('transferForm');
  if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const recipientName = document.getElementById('recipient').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      const note = document.getElementById('note').value;

      if (!recipientName || isNaN(amount) || amount <= 0) {
        alert("Please fill all fields with valid values.");
        return;
      }

      if (recipientName === user) {
        alert("You cannot transfer money to yourself.");
        return;
      }

      const recipient = users[recipientName];
      if (!recipient) {
        alert("Recipient not found.");
        return;
      }

      if (currentUser.balance < amount) {
        alert("Insufficient balance.");
        return;
      }

      // Update sender
      currentUser.balance -= amount;
      currentUser.transactions.push({
        type: "Transfer Sent",
        to: recipientName,
        amount,
        note,
        date: new Date().toLocaleString()
      });

      // Update recipient
      recipient.balance += amount;
      recipient.transactions.push({
        type: "Transfer Received",
        from: user,
        amount,
        note,
        date: new Date().toLocaleString()
      });

      updateUserData();
      users[recipientName] = recipient;
      localStorage.setItem('users', JSON.stringify(users));

      alert($${amount} transferred to ${recipientName} successfully.);
      transferForm.reset();
    });
  }

  // ===============================
  // Dashboard Update
  // ===============================
  const balanceField = document.getElementById('balance');
  if (balanceField) {
    balanceField.textContent = $${currentUser.balance.toFixed(2)};
  }

  const historyTable = document.getElementById('transactionTable');
  if (historyTable) {
    const tbody = historyTable.querySelector('tbody');
    tbody.innerHTML = ""; // Clear old data

    currentUser.transactions.slice().reverse().forEach(tx => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${tx.date}</td>
        <td>${tx.type}</td>
        <td>$${tx.amount}</td>
        <td>${tx.note || tx.to || tx.from || '-'}</td>
      `;
      tbody.appendChild(row);
    });
  }

});
