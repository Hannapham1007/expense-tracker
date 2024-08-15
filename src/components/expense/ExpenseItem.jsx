/* eslint-disable react/prop-types */
import { useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { ExpenseContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../reducers/category";
import { deleteExpense } from "../../reducers/expense";
import { deleteExpenseAPI } from "../../service/expenseAPI";

function ExpenseItem({ exp }) {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { loggedInUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const dateString = exp.expenseDate || exp.date;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const categories = useSelector(selectCategories);
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (cat) => String(cat.id) === String(categoryId)
    );
    return category ? category.name : "Unknown Category";
  };

  const dispatch = useDispatch();

  const handleDelete = async (event) => {
    event.preventDefault();
    if (loggedInUser) {
      deleteExpenseAPI(token, exp.id);
      const updatedExpenses = expenses.filter((e) => e.id !== exp.id);
      setExpenses(updatedExpenses);
    } else {
      dispatch(deleteExpense(exp.id));
    }
  };
  
  const handleEdit = () => {
    navigate(`/edit_expense/${exp.id}`);
  };
  return (
    <div>
      <p>
        {day} {month}
      </p>
      <div className="d-flex  justify-content-between">
        <div className="d-flex">
          {loggedInUser ? (
            <p>{exp.category.name}</p>
          ) : (
            <p> {getCategoryName(exp.category)} </p>
          )}
        </div>
        <div>
          <p>{exp.amount} kr</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <p className="fw-lighter fst-italic text-wrap">{exp.description}</p>
        <div>
          <MdOutlineModeEdit
            className=" mx-3 "
            style={{ cursor: "pointer" }}
            onClick={handleEdit}
          ></MdOutlineModeEdit>
          <MdOutlineDelete
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
          ></MdOutlineDelete>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
