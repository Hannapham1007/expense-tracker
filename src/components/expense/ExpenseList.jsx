import ExpenseItem from "./ExpenseItem";

function ExpenseList({filteredList}) {
  return (
    <div className="px-2 py-4">
      <h4 className="fw-bold balance-comp-expense">Expenses</h4>
      {filteredList.map((item) => (
        <ul key={item.id} className="list-group list-group-flush">
          <li
            className="list-group-item"
            style={{
              backgroundColor: "var(--secondary-background-color)",
              borderRadius: "6px",
            }}
          >
            <ExpenseItem exp={item}></ExpenseItem>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default ExpenseList;
