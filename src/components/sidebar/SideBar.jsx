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
];

function SideBar() {
  const { loggedInUser, setLoggedInUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
    if (loggedInUser === null) {
      setShowSignin(true);
    } else {
      setShowSignin(false);
    }
  }, [location, loggedInUser]);

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser", "token");
    window.location.reload();
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
        {showSignin ? (
          <div
            className="sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4"
            onClick={() => navigate("/auth")}
          >
            <i className="bi bi-box-arrow-right"></i>
            <p className="d-none d-md-block">Sign in</p>
          </div>
        ) : (
          <div>
            <div
              className="sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4"
              onClick={()=> navigate("account")}
            >
              <i className="bi-person"></i>
              <p className="d-none d-md-block">Account</p>
            </div>
            <div
              className="sidebar-item d-flex flex-column align-items-center justify-content-center px-4 py-4"
              onClick={handleLogOut}
            >
              <i className="bi bi-box-arrow-right"></i>
              <p className="d-none d-md-block">Log out</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
