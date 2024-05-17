import { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../App";
import CategoryItem from "./CategoryItem";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

function CategoryList() {
  const { categories } = useContext(CategoryContext);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("all");

  const handleNavigate = () => {
    navigate("/create_category");
  };

  const filterCategoriesByType = (type) => {
    const filtered = categories.filter((cat) => cat.type === type);
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  return (
    <>
    <Header/>
    <div className="d-flex justify-content-center pushdown mx-4">
      <div className="mt-4 col-md-10 col-12">
        <h2 className="text-center fw-bold text-uppercase"> My Categories</h2>
        <div className="d-flex justify-content-center my-4 mx-4">
          <button
            className={`btn btn-outline-bg me-4 ${
              activeItem === "all" ? "active-category" : ""
            }`}
            onClick={() => {
              setFilteredCategories(categories);
              setActiveItem("all");
            }}
          >
            All
          </button>
          <button
            className={`btn btn-outline-bg me-4 ${
              activeItem === "income" ? "active-category" : ""
            }`}
            onClick={() => {
              filterCategoriesByType("CATEGORY_INCOME");
              setActiveItem("income");
            }}
          >
            Income
          </button>
          <button
            className={`btn btn-outline-bg ${
              activeItem === "expense" ? "active-category" : ""
            }`}
            onClick={() => {
              filterCategoriesByType("CATEGORY_EXPENSE");
              setActiveItem("expenses");
            }}
          >
            Expense
          </button>
        </div>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, index) => (
            <CategoryItem key={index} category={cat} />
          ))
        ) : (
          <div className="text-start px-4">
            <p>Your category list is empty.</p>
            <p>
              When you add a category, it will display here. Let's get started!
            </p>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-center pt-3">
          <button className="btn btn-bg" onClick={handleNavigate}>
            Add New Category
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default CategoryList;
