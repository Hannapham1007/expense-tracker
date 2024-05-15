import React, { useContext, useState, useEffect } from "react";
import { CategoryContext, ExpenseContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function ExpenseForm({ setActiveComponent }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState({});
  const { loggedInUser, token } = useContext(UserContext);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { expenseCategories } = useContext(CategoryContext);
  const [expenseInput, setExpenseInput] = useState({
    amount: "",
    description: "",
    user: loggedInUser.id,
    category: expenseCategories.length > 0 ? expenseCategories[0].id : "",
    date: new Date().toISOString().split("T")[0],
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value);
    }
    if (name === "date") {
      setExpenseInput((inputData) => ({
        ...inputData,
        [name]: value,
      }));
    } else {
      setExpenseInput((inputData) => ({
        ...inputData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const date = new Date(expenseInput.date);
      const formattedDate = date.toISOString();
      const result = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...expenseInput, expenseDate: formattedDate }),
      });
      if (!result.ok) {
        setExpenseInput({
          amount: "",
          description: "",
          user: loggedInUser.id,
          category: expenseCategories.length > 0 ? expenseCategories[0].id : "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        const createdExpense = await result.json();
        setExpenses([...expenses, createdExpense.data]);
        setExpenseInput({
          amount: "",
          description: "",
          user: loggedInUser.id,
          category: expenseCategories.length > 0 ? expenseCategories[0].id : "",
          date: new Date().toISOString().split("T")[0],
        });
        navigate("/dashboard");
        setActiveComponent("dashboard");
      }
    } catch (error) {
      //console.log("Error", error);
    }
  };

  const handleCancel = () => {
    //setActiveComponent("dashboard");
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
          >
            {expenseCategories.map((item, index) => (
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
          ></input>
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
