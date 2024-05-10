import { useState } from "react";
import SideBar from "../sidebar/SideBar";
import Balance from "../balance/Balance";
import CategoryList from "../category/CategoryList";
import Transaction from "../createForm/Transaction";
import Profile from "../profile/Profile";
import Header from "../header/Header";

function DashBoard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  
  const handleClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Balance></Balance>;
      case "transaction":
        return <Transaction setActiveComponent={setActiveComponent}></Transaction>;
      case "category":
        return <CategoryList></CategoryList>;
      case "account":
        return <Profile></Profile>;
      default:
        return null;
    }
  };

  return (
    <>
    <Header/>
      <div className="d-flex">
        <div className="col-2">
          <SideBar handleClick={handleClick}></SideBar>
        </div>
        <div className="col-10">{renderComponent()}</div>
      </div>
    </>

  );
}

export default DashBoard;
