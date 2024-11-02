import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/Login.css';

function LoginPage({ setID }) {
    const [userId, setUserId] = useState(''); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createAccount = () => {
        navigate('/signup');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear error on each login attempt
    
        try {
            const response = await axios.post('http://localhost:3001/api/login', { userId, username, password });
            
            if (response.data.success) {
                setID(userId); // Set user ID only after successful login
                localStorage.setItem('userId', userId);
                localStorage.setItem('isAuthenticated', 'true'); // Mark user as authenticated
                navigate('/dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError('Login failed. Please check your credentials.');
        }
    };
    
    return (
        <div className='container'>
            <p className='welcome'>WELCOME TO CAFEBARAS</p>
            <div className="form">
                <p className='lts'>Login to system</p>

                <div className="userID">
                    <label htmlFor="userId">User ID</label>
                    <input 
                        type="text"
                        id="userId"
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}  
                        placeholder=''/>
                </div>
                <div className="user">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}  
                        placeholder=''/>
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='' />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            
            {error && <p className="error" style={{ color: '#4E2603' }}>{error}</p>}
            <div className="newAccountBtn">
                <p>Still no account?</p>
                <button onClick={createAccount}>Create an account</button>
            </div>
        </div>
    );
}

export default LoginPage;
