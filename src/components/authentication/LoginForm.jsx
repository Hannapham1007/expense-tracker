import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogin((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(API_URL);
    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      if (!res.ok) {
        //console.error("Failed to login");
        setError("Username or password is incorrect");
        setLogin({
          username: "",
          password: "",
        });
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
            <label className="form-label mb-0 fw-bold">Username</label>
            <input
              className="form-control mb-3"
              type="text"
              name="username"
              placeholder="Enter username"
              value={login.username}
              onChange={handleChange}
            ></input>
            <label className="form-label mb-0 fw-bold ">Password</label>
            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Enter password"
              value={login.password}
              onChange={handleChange}
            ></input>
            {error && <p className="text-danger mb-3">{error}</p>}
            <div className="d-flex justify-content-center">
              <button className="btn btn-bg" type="submit">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
