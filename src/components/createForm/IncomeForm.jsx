import React, { useContext, useState } from "react";
import { CategoryContext, IncomeContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createIncomeAPI } from "../../service/incomeAPI";
import { selectCategories } from "../../reducers/category";
import { addIncome } from "../../reducers/income";

function IncomeForm({ setActiveComponent }) {
  const { loggedInUser, token } = useContext(UserContext);
  const { incomes, setIncomes } = useContext(IncomeContext);
  const { incomeCategories } = useContext(CategoryContext);
  const selector = useSelector(selectCategories);
  const selectIncomeCategories = selector.filter((cat) => cat.type === "CATEGORY_INCOME");
  const categoriesToShow = loggedInUser ? incomeCategories : selectIncomeCategories;
  const [incomeInput, setIncomeInput] = useState({
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
    setIncomeInput((inputData) => ({...inputData, [name]: value}));
   
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const date = new Date(incomeInput.date).toISOString();
    const newIncome = { ...incomeInput, incomeDate: date };

    if (loggedInUser) {
      const createdIncome = await createIncomeAPI(newIncome, token);
      setIncomes([...incomes, createdIncome]);
      navigate("/dashboard");
      window.location.reload();
    } else {
      dispatch(addIncome(newIncome));
      navigate("/dashboard");
    }

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
            value={incomeInput.date}
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
            value={incomeInput.amount}
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
            value={incomeInput.description}
            onChange={handleChange}
          ></input>
          <div className="d-flex justify-content-center pt-4">
            <button className="btn btn-outline-bg mx-2" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" className="btn btn-bg">
              Add Income
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default IncomeForm;
