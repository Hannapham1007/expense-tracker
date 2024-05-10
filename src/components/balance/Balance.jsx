import { useContext, useState, useEffect } from "react";
import ExpenseList from "../expense/ExpenseList";
import IncomeList from "../income/IncomeList";
import { ExpenseContext } from "../../App";
import { IncomeContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Balance() {
  const { expenses } = useContext(ExpenseContext);
  const { incomes } = useContext(IncomeContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    defaultCurrentMonth();
  }, []);

  const defaultCurrentMonth = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    setStartDate(formatDate(firstDayOfMonth));
    setEndDate(formatDate(lastDayOfMonth));
  };
  const handleResetFilter = () => {
    defaultCurrentMonth();
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterExpenseByDate = (expense) => {
    if (!startDate || !endDate) return true;

    const transactionDate = new Date(expense.expenseDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return transactionDate >= start && transactionDate <= end;
  };

  const filterIncomeByDate = (income) => {
    if (!startDate || !endDate) return true;
    const transactionDate = new Date(income.incomeDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    return transactionDate >= start && transactionDate <= end;
  };

  const filteredExpenses = expenses.filter(filterExpenseByDate);
  const filteredIncomes = incomes.filter(filterIncomeByDate);

  const totalExp = filteredExpenses.reduce(
    (total, exp) => total + parseFloat(exp.amount),
    0
  );
  const totalInc = filteredIncomes.reduce(
    (total, inc) => total + parseFloat(inc.amount),
    0
  );
  const balance = totalInc - totalExp;
  const handleOnClickAddExpense = () => {
    navigate("/transaction");
  };

  // Format date in YYYY-MM-DD format
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

  return (
    <div className="container mt-4 pushdown">
      <div className="row justify-content-between ">
        <div className="col-md-6 col-12 mb-2 ">
          <div className="form-bg px-4 py-2">
            <label className="form-label fw-bold" style={{ color: "grey" }}>
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
        </div>
        <div className="col-md-6 col-12 mb-2">
          <div className="form-bg px-4 py-2">
            <label className="form-label fw-bold" style={{ color: "grey" }}>
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center col-12 mt-2">
        <button className="btn btn-bg mx-2" onClick={handleOnClickAddExpense}>
          <i className="bi bi-plus" style={{ color: "white" }} />
          Add Transaction
        </button>
        <button className="btn btn-outline-bg mx-2" onClick={handleResetFilter}>
          {" "}
          <i
            className="bi bi-filter"
            style={{ color: "var(--primary-color)" }}
          />{" "}
          Reset Filter
        </button>
      </div>

      <div className="row my-4 ">
        <div className="text-center col-4">
          <div
            className="px-2 py-2 rounded "
            style={{ backgroundColor: "var(--button-background-color)" }}
          >
            <h3 className="balance-comp-income fw-bold">{totalInc}</h3>
            <p>Income</p>
          </div>
        </div>
        <div className="text-center col-4">
          <div
            className="px-2 py-2 rounded "
            style={{ backgroundColor: "var( --balance-background-expense)" }}
          >
            <h3 className="balance-comp-expense fw-bold ">{totalExp}</h3>
            <p>Expense</p>
          </div>
        </div>
        <div className="text-center col-4">
          <div
            className="px-2 py-2 rounded "
            style={{ backgroundColor: "var(--balance-background-balance)" }}
          >
            <h3 className="balance-comp-balance fw-bold">{balance}</h3>
            <p>Balance</p>
          </div>
        </div>
      </div>
      <div>
        <IncomeList filteredList={filteredIncomes}></IncomeList>
      </div>
      <div>
        <ExpenseList filteredList={filteredExpenses}></ExpenseList>
      </div>
    </div>
  );
}


export default Balance;
