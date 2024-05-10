import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";

function EditPrrofile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: ["user"],
  });
  useEffect(() => {
    if (users && id) {
      const user = users.find((u) => Number(u.id) === Number(id));
      if (user) {
        setUserData(user);
      }
    }
  }, [users, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((data) => ({ ...data, [name]: value }));
  };

  const updateLocalStorageUser = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        console.error("Failed to update account");
        alert("Failed to update account");
      } else {
        fetchUsers();
        alert("Your account was successfully updated!");
        updateLocalStorageUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      //console.error("Error:", error);
    }
  };
  const fetchUsers = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  };
  const handleOnCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-4 py-4" style={{marginTop:'80px'}}>
      <form onSubmit={handleSubmit} className="col-md-7 col-10">
        <div className="mb-3">
          <label className="form-label mb-0 fw-bold">Username</label>
          <input
            className="form-control mb-3"
            type="text"
            name="username"
            placeholder="Enter username"
            value={userData.username}
            onChange={handleChange}
          ></input>
          <label className="form-label mb-0 fw-bold">Email</label>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email@gmail.com"
            value={userData.email}
            onChange={handleChange}
          ></input>
          <div className="d-flex justify-content-center">
            <button
            
              type="submit"
              className="btn btn-outline-bg mx-2"
              onClick={handleOnCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-bg mx-2">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPrrofile;
