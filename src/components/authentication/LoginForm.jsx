import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ setLoading }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      if (!res.ok) {
        setError(true);
      } else {
        //console.log("Login successful");
        const data = await res.json();
        const jwtToken = data.token;
        localStorage.setItem("token", jwtToken);
        fetchUser(data.id);
        navigate("/dashboard");
      }
    } catch (error) {
      //console.error('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = (id) => {
    fetch(`${API_URL}/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        window.location.reload();
      })
      .catch((error) => {
        //console.error('Error fetching user data:', error);
      });
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center px-4 py-4">
        <form onSubmit={handleSubmit} className="col-md-7 col-10">
          <div className="mb-3">
            <label className="form-label mb-0 fw-bold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="form-control mb-3"
              type="text"
              name="username"
              placeholder="Enter username"
              autoComplete="off"
              value={login.username}
              onChange={handleChange}
              required
            ></input>
            <label className="form-label mb-0 fw-bold " htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="off"
              value={login.password}
              onChange={handleChange}
              required
            ></input>
            {error ? ( <p className="text-danger mb-3">Username or password is incorrect</p>): ""}
            <div className="d-flex justify-content-center">
              <button className="btn btn-bg" type="submit">
                Sign In
              </button>
            </div>
            <div className="mt-2">
              <p className="my-0 small fw-bold">Testing credientials</p>
              <p className="my-0 small fw-light">Username: react</p>
              <p className="my-0 small fw-light"> Password: Helloworld123</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
