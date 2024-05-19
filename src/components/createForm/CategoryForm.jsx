import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext, UserContext } from "../../App";
import Header from "../header/Header";

function CategoryForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loggedInUser, token } = useContext(UserContext);
  const { categories, setCategories } = useContext(CategoryContext);
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    type: 0,
    user: loggedInUser.id,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryInput),
      });
      if (!result.ok) {
        // console.log("Failed to create category");
        setCategoryInput({
          name: "",
          type: 0,
          user: loggedInUser.id,
        });
      } else {
        const newCategory = await result.json();
        setCategories([...categories, newCategory.data]);
        setCategoryInput({
          name: "",
          type: 0,
          user: loggedInUser.id,
        });
        navigate("/categories");
      }
    } catch (error) {
      //console.log("Error", error);
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center">
      <div
        className="pt-4 col-md-7 col-10 d-flex flex-column align-items-center"
        style={{ marginTop: "80px" }}
      >
        <h2 className="text-uppercase fw-bold text-center">Add Category</h2>
        <form onSubmit={handleSubmit} className="w-75  form-bg py-4 px-4">
          <div className="mb-3">
            <label htmlFor="category-type" className="form-label">
              Category type
            </label>
            <select
            id="category-type"
              className="form-select mb-3"
              name="type"
              value={categoryInput.type}
              onChange={handleChange}
            >
              <option value={0}>Income</option>
              <option value={1}>Expense</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="category-name" className="form-label">
              Category name
            </label>
            <input
            id="category-name"
              type="text"
              className="form-control"
              placeholder="Enter category name"
              name="name"
              value={categoryInput.name}
              onChange={handleChange}
              required
              autoComplete="off"
            ></input>
            <div className="d-flex justify-content-center pt-4">
              <button className="btn btn-outline-bg mx-2" onClick={()=> navigate('/dashboard')}>Cancel</button>
              <button className="btn btn-bg mx-2">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default CategoryForm;
