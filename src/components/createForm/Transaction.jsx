import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import { useNavigate } from "react-router-dom";

function Transaction({setActiveComponent}) {
  const [isExpense, setIsExpense] = useState(true);
  const [activeItem, setActiveItem] = useState("expense");
  const navigate = useNavigate();
  return (
    <div className="container d-flex justify-content-center pushdown">
      <div className="col-md-10 col-12 mt-4">
        <div className="d-flex mx-4 my-4 justify-content-center">
          <button
            className={`btn btn-outline-bg me-4 ${
              activeItem === "expense" ? "active-transaction" : ""
            } `}
            onClick={() => {
              setIsExpense(true);
              setActiveItem("expense");
            }}
          >
            Expense
          </button>
          <button
            className={`btn btn-outline-bg ${
              activeItem === "income" ? "active-transaction" : ""
            }`}
            onClick={() => {
              setIsExpense(false);
              setActiveItem("income");
            }}
          >
            Income
          </button>
        </div>
        <div className="form-bg py-2">

        {isExpense ? <ExpenseForm setActiveComponent={setActiveComponent}/> : <IncomeForm setActiveComponent={setActiveComponent} />}
        </div>

      </div>
    </div>
  );
}

export default Transaction;
