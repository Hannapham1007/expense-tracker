import { useContext } from "react";
import { IncomeContext } from "../../App";
import IncomeItem from "./IncomeItem";

function IncomeList({filteredList}) {
  const { incomes } = useContext(IncomeContext);
  return (
    <div className="px-2 py-4">
      <h4 className="fw-bold balance-comp-income">Incomes</h4>
      {filteredList.map((item) => (
        <ul key={item.id} className="list-group list-group-flush">
          <li
            className="list-group-item"
            style={{
              backgroundColor: "var(--secondary-background-color)",
              borderRadius: "6px",
            }}
          >
            <IncomeItem inc={item}></IncomeItem>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default IncomeList;
