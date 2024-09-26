import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './log.css';

const isStrongPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
};

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isStrongPassword(password)) {
      alert('Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='bg'>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type='text'
                placeholder='Enter Name'
                autoComplete='off'
                name="name"
                required
                className='form-control rounded-0'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email'>
                <strong>Email</strong>
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                autoComplete='off'
                name="email"
                required
                className='form-control rounded-0'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password'>
                <strong>Password</strong>
              </label>
              <input
                type='password'
                placeholder='Enter Password'
                autoComplete='off'
                name="password"
                required
                className='form-control rounded-0'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='confirmPassword'>
                <strong>Confirm Password</strong>
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                autoComplete='off'
                name="confirmPassword"
                required
                className='form-control rounded-0'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>
              Register
            </button>
          </form>
          <p>Already have an account?</p>
          <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
