import React, { useState } from "react";
import LoginForm from "../authentication/LoginForm";
import SignUpForm from "../authentication/SignUpForm";
import expenseImg from "../../assets/expense.png";

function WelcomePage() {
  const [isLogIn, setIsLogIn] = useState(true);
  return (
    <section className="vh-100 welcome-container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-md-6 d-none d-md-block">
          <img
            src={expenseImg}
            className="w-100 vh-100 object-fit-contain"
            alt="welcome image"
            
            
          ></img>
        </div>

        <div className="col-md-6 col-12">
          <div className="vh-100 d-flex flex-column justify-content-center">
            <h2 className="fw-bold text-uppercase text-center">My Expense</h2>
            {isLogIn ? (
              <div>
                <LoginForm />

                <p className="text-center">
                  Don't have an account?
                  <span
                    className="fw-bold text-decoration-underline"
                    onClick={() => setIsLogIn(false)}
                    role="button"
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            ) : (
              <div>
                <SignUpForm setIsLogIn={setIsLogIn} />
                <p className="text-center">
                  Already have an account?
                  <span
                    className="fw-bold text-decoration-underline"
                    onClick={() => setIsLogIn(true)}
                    role="button"
                  >
                    Log In
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
