// script.js

document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmount = document.getElementById("total-amount");

  let expenses = [];

  // Add expense
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseName.value;
    const amount = parseFloat(expenseAmount.value);

    if (name && amount > 0) {
      const expense = { id: Date.now(), name, amount };
      expenses.push(expense);
      addExpenseToDOM(expense);
      updateTotal();
      expenseName.value = "";
      expenseAmount.value = "";
    }
  });

  // Add expense to DOM
  function addExpenseToDOM(expense) {
    const li = document.createElement("li");
    li.innerHTML = `
            ${expense.name}: $${expense.amount.toFixed(2)}
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        `;
    expenseList.appendChild(li);
  }

  // Update total amount
  function updateTotal() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
  }

  // Delete expense
  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== id);
      e.target.parentElement.remove();
      updateTotal();
    }
  });
});
