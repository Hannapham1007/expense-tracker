/* eslint-disable react/prop-types */
import { useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { ExpenseContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function ExpenseItem({ exp }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const dateString = exp.expenseDate;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });


  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch(`${API_URL}/expenses/${exp.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) {
        alert("Something went wrong. Please try again later");
      } else {
        const updatedExpenses = expenses.filter((e) => e.id !== exp.id);
        setExpenses(updatedExpenses);
      }
    } catch (error) {
      //console.log("error", error);
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
          <p>{exp.category.name}</p>
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
