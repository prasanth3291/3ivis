import React, {useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/Authslice';


function Login() {
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!loginData.username.trim()) {
            newErrors.username = "username is required";
        }
        if (!loginData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.user);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(login({ loginData }));
        }
    };

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>USER LOGIN</h2>
                <form>
                    <div className="input-field">                       
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            value={loginData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    {!error && errors.username && <div className="error">{errors.username}</div>}

                    <div className="input-field">
                       
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    {!error && errors.password && <div className="error">{errors.password}</div>}
                    {error && <div className="error">{error.detail}</div>}

                    <button type="submit" className="login-button" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
