import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Signin() {
  const [userRegister, setUserRegister] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'student', // Default role is Student and we added handle role to select between roles.
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleRole = (e) => {
    setUserRegister({ ...userRegister, role: e.target.value });
  };

  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const handleSignupPasswordToggle = () => {
    setShowSignupPassword(!showSignupPassword);
  };
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(userRegister);
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.phone) {
      errors.phone = 'Phone Number is required';
    } else if (values.phone.length < 10) {
      errors.phone = 'Phone number should be at least 10 numbers long';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = validate(userRegister);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  return (
    <div className="container">
      <div className="signform-container">
        <form id="signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userRegister.username}
            onChange={handleInput}
            required
          />
          <p className='error'>{formErrors.username}</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userRegister.email}
            onChange={handleInput}
            required
          />
          <p className='error'>{formErrors.email}</p>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={userRegister.phone}
            onChange={handleInput}
            required
          />
          <p className='error'>{formErrors.phone}</p>
          <input
            type={showSignupPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={userRegister.password}
            onChange={handleInput}
            required
          />
          <p className='error'>{formErrors.password}</p>
          <span className="password-toggle" onClick={handleSignupPasswordToggle}>
            <i className={showSignupPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
          </span>

          <div className="role-selection">
            <label id='radio1'>
              <input
                type="radio"
                name="role"
                value="student"
                checked={userRegister.role === 'student'}
                onChange={handleRole}
              />
              Student
            </label>
            <label id='radio1'>
              <input
              id='radio2'
                type="radio"
                name="role"
                value="teacher"
                checked={userRegister.role === 'teacher'}
                onChange={handleRole}
              />
              Teacher
            </label>
          </div>

          <button type="submit" onClick={handleSignupSubmit}>
            Sign Up
          </button>
          <p id="login-link">
            Already have an account? <Link to="/">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
