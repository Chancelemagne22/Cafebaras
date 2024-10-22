import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/Login.css';

function LoginPage() {
    const [userId, setUserId] = useState(''); // Optional if you decide to remove it
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error message
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });

            if (response.data.success) {
                localStorage.setItem('userId', response.data.userId); // Storing user ID
                navigate('/dashboard'); // Redirect to dashboard after successful login
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
            <div className="userID">
                <label htmlFor="">User ID</label>
                <input 
                    type="text"
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)}  
                    placeholder='ID'/>
            </div>
            <div className="user">
                <label htmlFor="">Username</label>
                <input 
                    type="text"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}  
                    placeholder='Username'/>
            </div>
            <div className="password">
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default LoginPage;
