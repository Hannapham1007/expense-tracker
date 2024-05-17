import { useContext, useState, useEffect } from "react";
import ExpenseList from "../expense/ExpenseList";
import IncomeList from "../income/IncomeList";
import { ExpenseContext } from "../../App";
import { IncomeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import SearchBar from "../filter/SearchBar";

function Balance() {
  const { expenses } = useContext(ExpenseContext);
  const { incomes } = useContext(IncomeContext);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterText, setFilterText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    defaultCurrentMonth();
  }, []);

  const defaultCurrentMonth = () => {
    const month = new Date();
    const currentMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    setSelectedMonth(formatDate(currentMonth));
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  }

  const handleSelectedMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filterByMonth = (item) => {
    const transactionDate = new Date(item.incomeDate || item.expenseDate);
    const selectedDate = new Date(selectedMonth);
    return (
      transactionDate.getFullYear() === selectedDate.getFullYear() &&
      transactionDate.getMonth() === selectedDate.getMonth()
    );
  };

  const filterByText = (item) => {
    const isMatchedCategory = item.category.name.toLowerCase().includes(filterText.toLowerCase());
    const isMatchedDescription = item.description?.toLowerCase().includes(filterText.toLowerCase());
    return isMatchedCategory || isMatchedDescription;
  };

  const filteredList = (list) => {
    return list.filter(item => filterByMonth(item) && filterByText(item));
  };

  const filteredExpenses = filteredList(expenses);
  const filteredIncomes = filteredList(incomes);

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

  return (
    <div className="container mt-4 pushdown">
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-md-8 col-12 my-2">
          <SearchBar filterText={filterText} setFilterText={setFilterText}></SearchBar>
        </div>
        <div className="col-md-4 col-12">
          <div className="form-bg px-2 py-2">
            <input
              id="month"
              type="month"
              className="form-control"
              value={selectedMonth}
              onChange={handleSelectedMonth}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="text-center col-4">
          <div className="px-2 py-2 rounded" style={{ backgroundColor: "var(--button-background-color)" }}>
            <h3 className="balance-comp-income fw-bold">{totalInc}</h3>
            <p>Income</p>
          </div>
        </div>
        <div className="text-center col-4">
          <div className="px-2 py-2 rounded" style={{ backgroundColor: "var(--balance-background-expense)" }}>
            <h3 className="balance-comp-expense fw-bold">{totalExp}</h3>
            <p>Expense</p>
          </div>
        </div>
        <div className="text-center col-4">
          <div className="px-2 py-2 rounded" style={{ backgroundColor: "var(--balance-background-balance)" }}>
            <h3 className="balance-comp-balance fw-bold">{balance}</h3>
            <p>Balance</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-bg" onClick={handleOnClickAddExpense}>
          <i className="bi bi-plus" style={{ color: "white" }} />
          Add Transaction
        </button>
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
