import React, {useState} from 'react'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function Auth() {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <div className='mt-4'>
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
  )
}

export default Auth
