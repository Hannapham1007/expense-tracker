import React, { useContext, useState, useEffect } from "react";
import ExpenseList from "../expense/ExpenseList";
import IncomeList from "../income/IncomeList";
import { ExpenseContext, UserContext } from "../../App";
import { IncomeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import SearchBar from "../filter/SearchBar";
import ChartBar from "../chart/ChartBar";
import { useSelector } from "react-redux";

function Balance() {
  const { expenses } = useContext(ExpenseContext);
  const { incomes } = useContext(IncomeContext);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filterText, setFilterText] = useState("");
  const reduxExpense = useSelector(state => state.expense.expenses);
  const {loggedInUser} = useContext(UserContext);
  const isLoggedIn = Boolean(loggedInUser);
  console.log(reduxExpense);
  const navigate = useNavigate();


  useEffect(() => {
    const currentMonth = formatDate(new Date());
    setSelectedMonth(currentMonth);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleSelectedMonth = (e) => setSelectedMonth(e.target.value);

  const filterByMonth = (item) => {
    const transactionDate = new Date(item.incomeDate || item.expenseDate);
    const selectedDate = new Date(selectedMonth);
    return (
      transactionDate.getFullYear() === selectedDate.getFullYear() &&
      transactionDate.getMonth() === selectedDate.getMonth()
    );
  };

  const filterByText = (item) => {
    const filterTextLower = filterText.toLowerCase();
    return (
      item.category?.name.toLowerCase().includes(filterTextLower) ||
      item.description?.toLowerCase().includes(filterTextLower)
    );
  };

  const filteredList = (list) => list.filter((item) => filterByMonth(item) && filterByText(item));
  const filteredExpenses = filteredList(expenses);
  const filteredIncomes = filteredList(incomes);

  const totalExp = filteredExpenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);
  const totalInc = filteredIncomes.reduce((total, inc) => total + parseFloat(inc.amount), 0);
  const balance = totalInc - totalExp;

  const handleOnClickAddExpense = () => navigate("/add_transaction");

  const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const incomeData = new Array(12).fill(0);
    const expenseData = new Array(12).fill(0);

    incomes.forEach((income) => {
      const date = new Date(income.incomeDate);
      incomeData[date.getMonth()] += parseFloat(income.amount);
    });

    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate);
      expenseData[date.getMonth()] += parseFloat(expense.amount);
    });

    return {
      labels: months,
      datasets: [
        { label: "Incomes", data: incomeData, backgroundColor: "#6161ff" },
        { label: "Expenses", data: expenseData, backgroundColor: "#fb275d" },
      ],
    };
  };

  const chartData = generateMonthlyData();

  return (
    <>
      <div className="row justify-content-center align-items-center mx-0">
        <div className="col-md-8 col-12 mb-3 px-2">
          <SearchBar
            filterText={filterText}
            setFilterText={setFilterText}
          ></SearchBar>
        </div>
        <div className="col-md-4 col-12 mb-3 px-2">
          <div className="form-bg px-2 py-2">
          <label
              className="form-label fw-bold  mb-0"
              style={{ color: "grey" }}
              htmlFor="month"
            >
              Current Month
            </label>
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
      <div className="d-flex">
        <div className="text-center col-4 align-items-center justify-content-center">
          <div
            className="rounded mx-2 py-2"
            style={{ backgroundColor: "var(--button-background-color)" }}
          >
            <h3 className="balance-comp-income fw-bold mb-0">{totalInc}</h3>
            <p>Income</p>
          </div>
        </div>
        <div className="text-center col-4 ">
          <div
            className="rounded mx-2 py-2"
            style={{ backgroundColor: "var(--balance-background-expense)" }}
          >
            <h3 className="balance-comp-expense fw-bold mb-0">{totalExp}</h3>
            <p>Expense</p>
          </div>
        </div>
        <div className="text-center col-4">
          <div
            className="rounded mx-2 py-2"
            style={{ backgroundColor: "var(--balance-background-balance)" }}
          >
            <h3 className="balance-comp-balance fw-bold mb-0">{balance}</h3>
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
        <div className="col-sm-12 col-md-12 col-lg-9 px-2">
          <ChartBar data={chartData} />
      </div>
      <div>
        
        <IncomeList filteredList={filteredIncomes}></IncomeList>
      </div>
      <div>
        {
          isLoggedIn ? ( <ExpenseList filteredList={filteredExpenses}></ExpenseList>) : (
            <ExpenseList filteredList={reduxExpense}></ExpenseList>
          )
        }
       
      </div>
    </>
  );
}

export default Balance;
