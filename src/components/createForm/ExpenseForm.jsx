import React, { useContext, useState } from "react";
import { ExpenseContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../reducers/expense";
import category, { selectCategories } from "../../reducers/category";
import { CategoryContext } from "../../App";
import { createExpenseAPI } from "../../service/expenseAPI";

function ExpenseForm({ setActiveComponent }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loggedInUser, token } = useContext(UserContext);
  const {expenses, setExpenses} = useContext(ExpenseContext);
  const { expenseCategories } = useContext(CategoryContext);
  const selector = useSelector(selectCategories);
  const selectExpenseCategories = selector.filter(
    (cat) => cat.type === "CATEGORY_EXPENSE"
  );
  const categoriesToShow = loggedInUser
    ? expenseCategories
    : selectExpenseCategories;
  const [expenseInput, setExpenseInput] = useState({
    amount: "",
    description: "",
    user: loggedInUser ? loggedInUser.id : "",
    category: categoriesToShow.length > 0 ? categoriesToShow[0].id : "",
    date: new Date().toISOString().split("T")[0],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const date = new Date(expenseInput.date).toISOString();
    const newExpense = { ...expenseInput, expenseDate: date };

    if (loggedInUser) {
      const createdExpense = createExpenseAPI(newExpense, token);
      setExpenses([...expenses, createdExpense]);
      navigate("/dashboard");
    } else {
      dispatch(addExpense(newExpense));
      navigate("/dashboard");
    }

    setExpenseInput({
      amount: "",
      description: "",
      category: categoriesToShow.length > 0 ? categoriesToShow[0].id : "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="px-4 pt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label mb-0" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="form-control mb-3"
            name="date"
            value={expenseInput.date}
            onChange={handleChange}
            required
          />

          <label className="form-label mb-0" htmlFor="category-name">
            Category
          </label>
          <select
            id="category-name"
            className="form-select mb-3"
            name="category"
            onChange={handleChange}
            value={expenseInput.category}
          >
            {categoriesToShow.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label className="form-label mb-0" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="form-control mb-3"
            placeholder="XX.XX kr"
            name="amount"
            value={expenseInput.amount}
            onChange={handleChange}
            required
          />

          <label className="form-label mb-0" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="form-control"
            placeholder="Description (Optional)"
            name="description"
            value={expenseInput.description}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-center pt-4">
            <button className="btn btn-outline-bg mx-2" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-bg mx-2">
              Add Expense
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
