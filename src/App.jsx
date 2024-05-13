import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard';
import { createContext, useState, useEffect } from 'react';
import CategoryList from './components/category/CategoryList';
import CategoryForm from './components/createForm/CategoryForm';
import EditExpenseItem from './components/expense/EditExpenseItem';
import EditIncomeItem from './components/income/EditIncomeItem';
import WelcomePage from './components/welcome/WelcomePage';
import EditPrrofile from './components/profile/EditPrrofile';
import PageNotFound from './components/pagenotfound/PageNotFound';
import Transaction from './components/createForm/Transaction';
import Loading from './components/loading/Loading';

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
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setLoggedInUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const fetchData = () => {
    setLoading(true); 
    Promise.all([
      fetchCategory(),
      fetchExpense(),
      fetchIncome(),
      fetchIncomeCategory(),
      fetchExpenseCategory(),
      fetchUser()
    ]).then(() => setLoading(false)); 
  };
  

  const fetchCategory = () =>{
    fetch(`${API_URL}/categories/user/${loggedInUser.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",'Authorization': `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((data) => {
      setCategories(data.data);
    });
  }

  const fetchIncomeCategory = () =>{
    fetch(`${API_URL}/categories/income/${loggedInUser.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",'Authorization': `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((data) => {
      setIncomeCategories(data.data);
    });
  }

  const fetchExpenseCategory = () =>{
    fetch(`${API_URL}/categories/expense/${loggedInUser.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",'Authorization': `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((data) => {
      setExpenseCategories(data.data);
    });
  }

  const fetchExpense = () =>{
    fetch(`${API_URL}/expenses/${loggedInUser.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",'Authorization': `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((data) => {
      setExpenses(data.data);
    });
  }

  const fetchIncome = () =>{
    fetch(`${API_URL}/incomes/${loggedInUser.id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",'Authorization': `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((data) => {
      setIncomes(data.data);
    });
  }

  const fetchUser= () =>{
    fetch(`${API_URL}/users`)
    .then((res) => res.json())
    .then((data) => {
      setUsers(data.data);
    });

  }
  useEffect(() => {
    if (loggedInUser && token) {
      fetchData();
    }
  }, [loggedInUser, token]);

  return (
    <>
    <UserContext.Provider value={{users: users, setUsers: setUsers, loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser, token: token, setToken: setToken}}>
      <CategoryContext.Provider value={{categories: categories, setCategories: setCategories, incomeCategories: incomeCategories, setIncomeCategories: setIncomeCategories, expenseCategories: expenseCategories, setExpenseCategories:setExpenseCategories}}>
        <ExpenseContext.Provider value={{expenses: expenses, setExpenses: setExpenses}}>
          <IncomeContext.Provider value={{incomes: incomes, setIncomes: setIncomes}}>
            <Routes>
              <Route path='/' element={loading ? <Loading/> : <WelcomePage/>} />
              <Route path='/dashboard' element={loading ? <Loading/> : <DashBoard />} />
              <Route path='/categories' element={<CategoryList />} />
              <Route path='/transaction' element={<Transaction/>}></Route>
              <Route path='/create_category' element={<CategoryForm />} />
              <Route path='/edit_expense/:id' element={<EditExpenseItem />} /> 
              <Route path='/edit_income/:id' element={<EditIncomeItem />} />
              <Route path='/edit_profile/:id' element={<EditPrrofile/>}></Route>
              <Route path="/404"  element={<PageNotFound/>} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </IncomeContext.Provider>
        </ExpenseContext.Provider>
      </CategoryContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export  { App, CategoryContext, ExpenseContext, IncomeContext, UserContext};
