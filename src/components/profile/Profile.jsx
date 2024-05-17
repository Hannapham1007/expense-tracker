import React from "react";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Profile() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();
  const handleEdit = () =>{
    navigate(`/edit_profile/${loggedInUser.id}`)

  }
  return (
    <div className="align-items-center justify-content-center mx-2 pushdown">
      <h2 className="text-center fw-bold mt-4">My Expense Account</h2>
      <div className="mt-4 col-md-8 container form-bg px-4 py-4" >
        <div className="row mx-0">
          <p className="col px-0">Username: {loggedInUser.username} </p>
          <div className="col-3 d-flex justify-content-end align-items-center" >
            <MdEdit className="mb-1" />
            <button className="btn btn-link fw-bold text-decoration-underline px-1" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
        <div>
          <p>Email: {loggedInUser.email}</p>
        </div>

      </div>
    </div>
  );
}

export default Profile;
