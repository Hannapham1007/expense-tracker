import { useContext, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { CategoryContext, UserContext } from "../../App";
import { useDispatch } from "react-redux";
import { editCategory, deleteCategory } from "../../reducers/category";
import {
  deleteCategoryAPI,
  updateCategoryAPI,
} from "../../service/categoryAPI";

function CategoryItem({ category }) {
  const { loggedInUser, token } = useContext(UserContext);
  const { categories, setCategories } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (loggedInUser) {
      updateCategoryAPI(
        editedName,
        category.type,
        loggedInUser.id,
        category.id,
        token
      );
      const updatedCategories = categories.map((cat) =>
        cat.id === category.id ? { ...cat, name: editedName } : cat
      );
      setCategories(updatedCategories);
    } else {
      const updatedCategory = { ...category, name: editedName };
      dispatch(editCategory(updatedCategory));
    }
  };

  const handleDelete = (event) => {
    if (loggedInUser) {
      deleteCategoryAPI(category.id, token);
      const updatedCategories = categories.filter(
        (cat) => cat.id !== category.id
      );
      setCategories(updatedCategories);
    } else {
      dispatch(deleteCategory(category.id));
    }
  };

  return (
    <ul className="list-group mx-4">
      <li className="list-group-item my-1">
        <div className="d-flex justify-content-between">
          {isEditing ? (
            <>
              <input
                id="category-name"
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="form-control text-wrap"
              />
              <div className=" d-flex align-items-center mx-4">
                <button
                  className="btn btn-link fw-bold text-decoration-underline px-2"
                  onClick={handleSave}
                  style={{ color: "var(--primary-color)" }}
                >
                  Save
                </button>
                <button
                  className="btn btn-link fw-bold text-decoration-underline px-2"
                  onClick={() => setIsEditing(false)}
                  style={{ color: "var(--accent-color-second)" }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>{category.name}</div>
              <div
                className="d-none d-md-flex align-items-center"
                onClick={handleEdit}
              >
                <div className="mx-2">
                  <MdOutlineModeEdit />
                  <button className="btn btn-link fw-bold text-decoration-underline px-0 ">
                    Edit
                  </button>
                </div>

                <div
                  className="d-none d-md-flex align-items-center mx-1"
                  onClick={handleDelete}
                >
                  <div className="mx-2">
                    <MdOutlineDelete />
                    <button className="btn btn-link fw-bold text-decoration-underline px-0">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-md-none">
                <MdOutlineModeEdit className="mx-3" onClick={handleEdit} />
                <MdOutlineDelete onClick={handleDelete} />
              </div>
            </>
          )}
        </div>
      </li>
    </ul>
  );
}

export default CategoryItem;
