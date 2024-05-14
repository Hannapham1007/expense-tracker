import React, { useContext, useEffect, useState } from "react";
import { IncomeContext, UserContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryContext } from "../../App";
import Header from "../header/Header";

function EditIncomeItem() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loggedInUser, token } = useContext(UserContext);
  const { incomes } = useContext(IncomeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { incomeCategories } = useContext(CategoryContext);
  const [incomeInput, setIncomeInput] = useState({
    amount: "",
    description: "",
    user: "",
    category: "",
    date: "",
  });
  useEffect(() => {
    if (incomes && id) {
      const income = incomes.find((exp) => Number(exp.id) === Number(id));
      if (income) {
        // Split date string to get yyyy, mm, and dd parts
        const [yyyy, mm, dd] = income.incomeDate.split("T")[0].split("-");
        // Format the date to yyyy-mm-dd
        const formattedPrevDate = `${yyyy}-${mm}-${dd}`;
        setIncomeInput({
          amount: income.amount,
          description: income.description,
          user: income.user,
          category: income.category.id,
          date: formattedPrevDate,
        });
      }
    }
  }, [incomes, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const date = new Date(incomeInput.date);
      const formattedDate = date.toISOString();
      const result = await fetch(`${API_URL}/incomes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...incomeInput, incomeDate: formattedDate }),
      });
      if (!result.ok) {
        alert("Failed to update income");
        setIncomeInput(incomeInput);
      } else {
        const data = await result.json();
        setIncomeInput({
          amount: "",
          description: "",
          user: loggedInUser.id,
          category: "",
          date: new Date().toISOString().split("T")[0],
        });
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (error) {
      //console.log("Error", error);
    }
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center pushdown mt-4 ">
        <div className="col-md-10 col-12">
          <i
            className="bi bi-arrow-left-circle mx-2"
            style={{
              color: "var(--primary-color)",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          />
          <h2 className="text-center fw-bold text-uppercase"> Edit Income</h2>
          <form className="px-4 py-4 form-bg" onSubmit={handleSubmit}>
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
                {incomeCategories.map((item) => (
                  <option key={item.id} value={item.id}>
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
                placeholder="Description"
                name="description"
                value={incomeInput.description}
                onChange={handleChange}
              ></input>
              <div className="d-flex justify-content-center pt-4">
                <button type="submit" className="btn btn-bg">
                  Update Income
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditIncomeItem;
