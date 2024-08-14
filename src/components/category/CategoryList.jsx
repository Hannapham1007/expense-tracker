import { useContext, useState, useEffect } from "react";
import { CategoryContext, UserContext } from "../../App";
import CategoryItem from "./CategoryItem";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { useSelector } from "react-redux";

function CategoryList() {
  const { categories } = useContext(CategoryContext);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [activeItem, setActiveItem] = useState("all");
  const categoriesSelector = useSelector(state => state.category.categories);
  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext);
  const isLoggedIn = Boolean(loggedInUser);

  const categoriesToShow = isLoggedIn ? categories : categoriesSelector;

  const handleNavigate = () => {
    navigate("/create_category");
  };

  const filterCategoriesByType = (type) => {
    const filtered = categoriesToShow.filter((cat) => cat.type === type);
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    setFilteredCategories(categoriesToShow);
  }, [categoriesToShow]);

  return (
    <>
    <div className="d-flex justify-content-center">
      <div className="col-md-10 col-12">
        <h2 className="text-center fw-bold text-uppercase"> My Categories</h2>
        <div className="d-flex justify-content-center my-4 mx-4">
          <button
            className={`btn btn-outline-bg me-4 ${
              activeItem === "all" ? "active-category" : ""
            }`}
            onClick={() => {
              setFilteredCategories(categoriesToShow);
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
