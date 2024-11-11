import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';
import { logoutUser } from '../features/Authslice';
import {jwtDecode} from 'jwt-decode';
import { refreshAccessToken } from '../features/Authslice';


function Navbar() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector(state => state.user);
  

useEffect(() => {
    console.log('Setting up token expiry check');

    const interval = setInterval(async () => {
        console.log('Checking token expiry'); // This will print every second
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));

        if (authTokens) {
            const accessToken = authTokens.access;
            const tokenExpiry = jwtDecode(accessToken).exp * 1000; // Convert to milliseconds
            const now = Date.now();

            // Refresh token if it's about to expire in the next 60 seconds
            if (tokenExpiry - now < 600000) { 
                dispatch(refreshAccessToken());
                console.log('Token refreshed');
            } else {
                console.log('Token not due for refresh');
            }
        }
    }, 30000); // Check every second (1000 milliseconds)

    // Clean up on component unmount
    return () => clearInterval(interval);
}, [dispatch]);


  const handleLogout = () => {
    localStorage.removeItem('authTokens');
    dispatch(logoutUser());
  };

  return (
    <nav style={{ zIndex: '100' }}>
      <ul className="nav-links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <li className={menuOpen ? 'display' : ''}>
          <NavLink to="/about">About</NavLink>
        </li>
        {user && (
          <li className={menuOpen ? 'display' : ''}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        )}
      </ul>
      <ul className="auth-links">
        {!user ? (
          <>
            <li className={menuOpen ? 'display' : ''}>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className={menuOpen ? 'display' : ''}>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={menuOpen ? 'display' : ''}>
              <h6 className="user-greeting">Hai {user.username}</h6>
            </li>
            <li className={menuOpen ? 'display' : ''} onClick={handleLogout}>
              <NavLink to="/">Logout</NavLink>
            </li>
          </>
        )}
        <li className={menuOpen ? 'display' : ''}>
          <input type="text" placeholder="Search..." />
          <FaSearch style={{ position: 'relative', right: '20px', bottom: '2px' }} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
