import { useContext, useState, useEffect } from "react";
import IncomeList from "../income/IncomeList";
import ExpenseList from "../expense/ExpenseList";
import { ExpenseContext, IncomeContext } from "../../App";
import SearchBar from "../filter/SearchBar";
import DateRangeFilter from "../filter/DateRangeFilter";

function TransactionList() {
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpenseContext);
  const [filterText, setFilterText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleResetFilter = () => {
    defaultCurrentMonth();
  };

  const filteredList = (theList) => {
    return theList.filter((item) => {
      const isMatchedCategory = item.category.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const isMatchedDescription = item.description
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const transactionDate = new Date(item.incomeDate || item.expenseDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return (
        (isMatchedCategory || isMatchedDescription) &&
        (!startDate ||
          !endDate ||
          (transactionDate >= start && transactionDate <= end))
      );
    });
  };

  const filteredIncome = filteredList(incomes);
  const filteredExpense = filteredList(expenses);

  return (
    <div className="">
        <h2 className="text-center text-uppercase fw-bold">My Transactions</h2>
        <div className="mb-3 mx-3">

        <SearchBar
          filterText={filterText}
          setFilterText={setFilterText}
        ></SearchBar>
      </div>

      <DateRangeFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleResetFilter={handleResetFilter}
      ></DateRangeFilter>
      <IncomeList filteredList={filteredIncome}></IncomeList>
      <ExpenseList filteredList={filteredExpense}></ExpenseList>
    </div>
  );
}

export default TransactionList;
