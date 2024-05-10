import React, { useContext, useState } from "react";
import { CategoryContext, IncomeContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function IncomeForm({setActiveComponent}) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState({});
  const { loggedInUser, token } = useContext(UserContext);
  const {incomes, setIncomes} = useContext(IncomeContext);
  const { incomeCategories } = useContext(CategoryContext);
  const [incomeInput, setIncomeInput] = useState({
    amount: "",
    description: "",
    user: loggedInUser.id,
    category: incomeCategories.length > 0 ? incomeCategories[0].id : "",
    date: new Date().toISOString().split("T")[0]
    
  });
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setCategory(value);
    }
    if (name === "date") {
      setIncomeInput((inputData) => ({
        ...inputData,
        [name]: value,
      }));
    }
    else{
    setIncomeInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const date = new Date(incomeInput.date);
      const formattedDate = date.toISOString();
      const result = await fetch(`${API_URL}/incomes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...incomeInput, incomeDate: formattedDate }),
      });
      if (!result.ok) {
        setIncomeInput({
          amount: "",
          description: "",
          user: loggedInUser.id,
          category: incomeCategories.length > 0 ? incomeCategories[0].id : "",
          date:new Date().toISOString().split("T")[0]
        });
      } else {
        const createdIncome = await result.json();
        setIncomes([...incomes, createdIncome.data]);
        setIncomeInput({
          amount: "",
          description: "",
          user: loggedInUser.id,
          category: incomeCategories.length > 0 ? incomeCategories[0].id : "",
          date:new Date().toISOString().split("T")[0]
        });
        setActiveComponent("dashboard");
        navigate('/dashboard');
        
      }
    } catch (error) {
      //console.log("Error", error);
    }
  };
  const handleCancel =() =>{
    setActiveComponent("dashboard");
    navigate('/dashboard');
  }

  return (
    <div className="px-4 pt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <input
            type="date"
            className="form-control mb-3"
            name="date"
            value={incomeInput.date}
            onChange={handleChange}
            required
          /> 
          <label className="form-label mb-0">Category</label>
          <select
            className="form-select mb-3"
            name="category"
            onChange={handleChange}
          >
            {incomeCategories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label className="form-label mb-0">Amount</label>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="XX.XX kr"
            name="amount"
            value={incomeInput.amount}
            onChange={handleChange}
            required
          />

          <label className="form-label mb-0">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description (Optional)"
            name="description"
            value={incomeInput.description}
            onChange={handleChange}
          ></input>
          <div className="d-flex justify-content-center pt-4">
          <button className="btn btn-outline-bg mx-2" onClick={handleCancel}>Cancel</button>

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
