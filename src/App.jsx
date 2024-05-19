import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import DashBoard from "./components/dashboard/DashBoard";
import CategoryList from "./components/category/CategoryList";
import CategoryForm from "./components/createForm/CategoryForm";
import EditExpenseItem from "./components/expense/EditExpenseItem";
import EditIncomeItem from "./components/income/EditIncomeItem";
import WelcomePage from "./components/welcome/WelcomePage";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import Transaction from "./components/createForm/Transaction";
import Loading from "./components/loading/Loading";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import TransactionList from "./components/transaction/TransactionList";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";

const CategoryContext = createContext();
const ExpenseContext = createContext();
const IncomeContext = createContext();
const UserContext = createContext();

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setLoggedInUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loggedInUser && token) {
      fetchData();
    }
  }, [loggedInUser, token]);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetchCategory(),
      fetchExpense(),
      fetchIncome(),
      fetchIncomeCategory(),
      fetchExpenseCategory(),
      fetchUser(),
    ]).then(() => setLoading(false));
  };

  const fetchCategory = () => {
    fetch(`${API_URL}/categories/user/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      });
  };

  const fetchIncomeCategory = () => {
    fetch(`${API_URL}/categories/income/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIncomeCategories(data.data);
      });
  };

  const fetchExpenseCategory = () => {
    fetch(`${API_URL}/categories/expense/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenseCategories(data.data);
      });
  };

  const fetchExpense = () => {
    fetch(`${API_URL}/expenses/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.data);
      });
  };

  const fetchIncome = () => {
    fetch(`${API_URL}/incomes/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIncomes(data.data);
      });
  };

  const fetchUser = () => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loggedInUser,
        setLoggedInUser,
        token,
        setToken,
      }}
    >
      <CategoryContext.Provider
        value={{
          categories,
          setCategories,
          incomeCategories,
          setIncomeCategories,
          expenseCategories,
          setExpenseCategories,
        }}
      >
        <ExpenseContext.Provider value={{ expenses, setExpenses }}>
          <IncomeContext.Provider value={{ incomes, setIncomes }}>
            {loggedInUser ? (
              <>
                <header>
                  <Header />
                </header>
                <main className="d-flex" style={{marginTop:'80px'}}>
                  <aside className="sidebar">
                    <SideBar />
                  </aside>
                  <section className="content-container">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<DashBoard />} />
                      <Route path="/categories" element={<CategoryList />} />
                      <Route
                        path="/transaction_list"
                        element={<TransactionList />}
                      />
                      <Route path="/account" element={<Profile />} />
                      <Route
                        path="/add_transaction"
                        element={<Transaction />}
                      />
                      <Route
                        path="/edit_account/:id"
                        element={<EditProfile />}
                      />
                      <Route
                        path="/create_category"
                        element={<CategoryForm />}
                      />
                      <Route
                        path="/edit_expense/:id"
                        element={<EditExpenseItem />}
                      />
                      <Route
                        path="/edit_income/:id"
                        element={<EditIncomeItem />}
                      />
                      <Route path="/404" element={<PageNotFound />} />
                      <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                  </section>
                </main>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            )}
          </IncomeContext.Provider>
        </ExpenseContext.Provider>
      </CategoryContext.Provider>
    </UserContext.Provider>
  );
}

export { App, CategoryContext, ExpenseContext, IncomeContext, UserContext };
