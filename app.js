// SELECTORS
const btnAddMoney = document.querySelector(".budget__btn");
const btnFormExpense = document.querySelector(".form-expense__btn");
const budgetAmount = document.querySelector(".budget__amount");
const budgetRemainingAmount = document.querySelector(
  ".budget__remaining--amount"
);
const formAmountInput = document.querySelector(".form__amount");
const formExpenseInput = document.querySelectorAll(".form-expense__input");
const expense = document.querySelector(".expense");
const errorMsg = document.querySelector(".error-msg");
const quote = document.querySelector("blockquote");

let balance = 0;
const highestAmount = 40000;
const leastAmount = 0;
const highestLengthAmount = 5;
const leastLengthAmount = 3;
const items = [];

const displayErrorMsg = function (isRemoved = false) {
  if (!isRemoved) {
    errorMsg.style.display = "none";
  } else {
    errorMsg.style.display = "block";
  }
};

const displayErrorToUI = (message) => (quote.textContent = message);
displayErrorMsg(false);

const addToUI = function (data) {
  data.forEach(({ formExpensePrice, formExpenseItem }) => {
    const expenseEl = `
          <ul class="expense__list">
              <li class="expense__item">${formExpenseItem.value}</li>
              <li class="expense__item">${formExpensePrice.value}</li>
          </ul>`;

    return expense.insertAdjacentHTML("beforeend", expenseEl);
  });
};

const displayBudgetBalance = (bal, budgetType) =>
  (budgetType.textContent = `#${bal}`);

displayBudgetBalance(balance, budgetAmount);
displayBudgetBalance(balance, budgetRemainingAmount);

btnAddMoney.addEventListener("click", function (e) {
  e.preventDefault();
  formAmountInput.style.display = "block";
  formAmountInput.classList.add("move-right");
  e.target.classList.add("add-btn");
  e.target.defaultValue = "+";
  displayErrorMsg(true);

  if (
    formAmountInput.value &&
    formAmountInput.value.length <= highestLengthAmount &&
    formAmountInput.value.length >= leastLengthAmount
  ) {
    balance += +formAmountInput.value;

    displayBudgetBalance(balance, budgetAmount);
    formAmountInput.classList.remove("move-right");
    e.target.classList.add("budget__btn--no-effect");

    e.target.disabled = true;
    displayErrorMsg(false);
    budgetRemainingAmount.textContent = `#${balance}`;
  }
});

btnFormExpense.addEventListener("click", function (e) {
  e.preventDefault();
  const [formExpensePrice, formExpenseItem] = formExpenseInput;
  if (
    formExpensePrice.value &&
    formExpenseItem.value &&
    balance >= leastAmount
  ) {
    balance -= formExpensePrice.value;

    budgetAmount.textContent = `#${balance}`;
    displayBudgetBalance(balance, budgetAmount);

    items.push({ formExpensePrice, formExpenseItem });
    items.length > 1 && items.pop();

    addToUI(items);
    formExpensePrice.value = formExpenseItem.value = "";
  }

  if ((formExpensePrice.value && formExpenseItem.value) || balance <= 0) {
    displayErrorToUI(
      `You haven't added any money yet or your balance is empty! `
    );
    setTimeout(
      () =>
        displayErrorToUI(
          `Pls kindly input your expense amount and the product below `
        ),
      4000
    );
  } else {
    displayErrorToUI(
      `Pls kindly input your expense amount and the product below `
    );
  }
});
