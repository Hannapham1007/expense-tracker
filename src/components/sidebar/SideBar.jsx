import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

const sidebarItems = [
  { id: "dashboard", icon: "bi-speedometer2", text: "Dashboard" },
 // { id: "transaction", icon: "bi-arrow-left-right", text: "Transactions" },
  { id: "category", icon: "bi-columns-gap", text: "Categories" },
  { id: "account", icon: "bi-person", text: "Account" },
];

function SideBar({ handleClick }) {
  const { setLoggedInUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setToken(null);
    navigate("/");
  };

  const handleItemClick = (itemId) => {
    handleClick(itemId);
    setActiveItem(itemId);
  };

  return (
    <div className="sidebar vh-100 d-block form-bg pushdown">
      <div className="d-flex flex-column">
        {sidebarItems.map(({ id, icon, text }) => (
          <div
            key={id}
            className={`sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4 ${activeItem === id ? "active" : ""}`}
            onClick={() => handleItemClick(id)}
          >
            <i className={`bi ${icon} ${activeItem === id ? "active-icon" : ""}`}></i>
            <p className={`d-none d-md-block ${activeItem === id ? "active-text" : ""}`}>{text}</p>
          </div>
        ))}
        <div className="sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4" onClick={handleLogOut}>
          <i className="bi bi-box-arrow-right"></i>
          <p className="d-none d-md-block">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
