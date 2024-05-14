import { useContext, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { CategoryContext, UserContext } from "../../App";

function CategoryItem({ category }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loggedInUser, token } = useContext(UserContext);
  const { categories, setCategories } = useContext(CategoryContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const result = await fetch(`${API_URL}/categories/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editedName,
          type: category.type,
          user: loggedInUser.id,
        }),
      });
      if (!result.ok) {
        //console.log("failed to update");
      } else {
        const updatedCategories = categories.map((cat) =>
          cat.id === category.id ? { ...cat, name: editedName } : cat
        );

        setCategories(updatedCategories);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleDelete = async (event) => {
    try {
      const result = await fetch(`${API_URL}/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) {
        //console.log("Failed to delete");
        alert(
          "The category is used in your transaction logs and cannot be deleted."
        );
      } else {
        const updatedCategories = categories.filter(
          (cat) => cat.id !== category.id
        );
        setCategories(updatedCategories);
      }
    } catch (error) {
      //console.log("error", error);
      alert(
        "The category is used in your transaction logs and cannot be deleted"
      );
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
