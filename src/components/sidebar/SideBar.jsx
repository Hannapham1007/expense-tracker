import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";

const sidebarItems = [
  {
    id: "dashboard",
    icon: "bi-speedometer2",
    text: "Dashboard",
    route: "/dashboard",
  },
  {
    id: "transaction_list",
    icon: "bi-arrow-left-right",
    text: "Transactions",
    route: "/transaction_list",
  },
  {
    id: "category",
    icon: "bi-columns-gap",
    text: "Categories",
    route: "/categories",
  },
  {
    id: "account",
    icon: "bi-person",
    text: "Account",
    route: "/account",
  },
];

function SideBar() {
  const { setLoggedInUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    setToken(null);
    navigate("/");
  };

  const handleItemClick = (route) => {
    navigate(route);
    setActiveItem(route);
  };

  return (
    <div className="vh-100 d-block form-bg">
      <div className="d-flex flex-column">
        {sidebarItems.map(({ id, icon, text, route }) => (
          <div
            key={id}
            className={`sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4 ${
              activeItem === route ? "active" : ""
            }`}
            onClick={() => handleItemClick(route)}
          >
            <i
              className={`bi ${icon} ${
                activeItem === route ? "active-icon" : ""
              }`}
            ></i>
            <p
              className={`d-none d-md-block ${
                activeItem === route ? "active-text" : ""
              }`}
            >
              {text}
            </p>
          </div>
        ))}
        <div
          className="sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4"
          onClick={handleLogOut}
        >
          <i className="bi bi-box-arrow-right"></i>
          <p className="d-none d-md-block">Log Out</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
