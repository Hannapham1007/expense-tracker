/* eslint-disable react/prop-types */
import { useContext } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { IncomeContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../reducers/category";
import { deleteIncome } from "../../reducers/income";
import { deleteIncomeAPI } from "../../service/incomeAPI";

function IncomeItem({ inc }) {
  const { incomes, setIncomes } = useContext(IncomeContext);
  const { loggedInUser, token } = useContext(UserContext);
  const navigate = useNavigate();
  const dateString = inc.incomeDate || inc.date;
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

    if(loggedInUser){
      deleteIncomeAPI(token, inc.id);
      const updatedIncomes = incomes.filter((i)=> i.id !== inc.id);
      setIncomes(updatedIncomes);
    }else{
      dispatch(deleteIncome(inc.id));
    }

 
  };

  const handleEdit = () => {
    navigate(`/edit_income/${inc.id}`);
  };
  return (
    <div>
      <p>
        {day} {month}
      </p>
      <div className="d-flex  justify-content-between">
        <div className="d-flex">
        {loggedInUser ? (
            <p>{inc.category.name}</p>
          ) : (
            <p> {getCategoryName(inc.category)} </p>
          )}
        </div>
        <div>
          <p>{inc.amount} kr</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <p className="fw-lighter fst-italic text-wrap">{inc.description}</p>

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

export default IncomeItem;
