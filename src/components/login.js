import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginPasswordToggle = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(loginEmail, loginPassword);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!values.loginEmail) {
      errors.loginEmail = 'Username is required';
    } else if (!emailPattern.test(values.loginEmail)) {
      errors.loginEmail = 'Invalid email format';
    }

    if (!values.loginPassword) {
      errors.loginPassword = 'Password is required';
    } else if (values.loginPassword.length < 8) {
      errors.loginPassword = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const values = { loginEmail, loginPassword };
    const errors = validate(values);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      // Perform your successful login logic here
      setSuccess(true);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Congratulations! You are logged in</h1>
          <Link to="/mainpage">Go to Main Page</Link>
        </section>
      ) : (
        <div className="container">
          <div className="form-container">
            <form id="login-form">
              <h2>Login</h2>
              <input
                id='login-email'
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <p className='error'>{formErrors.loginEmail}</p>
              <input
                id='login-pass'
                type={showLoginPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <p className='error'>{formErrors.loginPassword}</p>
              <span className="password-toggle" onClick={handleLoginPasswordToggle}>
                <i className={showLoginPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
              </span>
              {/* "Remember Me" radio button */}
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Keep me logged in</label>
              </div>
              <button type="submit" onClick={handleLoginSubmit}>
                Login
              </button>
              <p id="signup-link">
                Don't have an account? <Link to="/signin">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
