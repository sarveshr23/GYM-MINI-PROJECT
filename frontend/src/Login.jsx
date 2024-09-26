import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; 
import './log.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password }).then(
            (result) => {
                console.log(result);
                toast(result.data.message);
                if (result.data.message === "success") {
                    if (result.data.role === "admin") {
                        navigate('/admin');
                    } 
                    else if(result.data.role === "trainer"){
                        navigate('/trainer');
                    }else {
                        navigate('/home');
                    }
                }
            }
        ).catch(
            (err) => console.log(err)
        );
    }


    return (
        <div className='log-bg'>
        <div className='login-container'>
            <div className='login-form'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='on'
                            name="email"
                            className='inputbox'
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
                            autoComplete='on'
                                     name="password"
                            className='inputbox'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>
                        Login
                    </button>
                </form>
                <p>Don't Have an account?</p>
                <Link to='/' className='btn btn-default text-decoration-none'>
                    Register
                </Link>
            </div>

            <ToastContainer />
        </div>
        </div>
    );
}

export default Login;