import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/Login.css';

function LoginPage({setID}) {
    const [userId, setUserId] = useState(''); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(' ');
    const navigate = useNavigate();


    const createAccount = async (e)=>{
        navigate('/signup');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setID(userId);
    
        try {
            const response = await axios.post('http://localhost:3001/api/login', { userId, username, password });
            
            if (response.data.success) {
                localStorage.setItem('userId', response.data.userId); // Store user ID
                localStorage.setItem('isAuthenticated', 'true'); // Mark user as authenticated
                navigate('/dashboard')
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
                    <label htmlFor="">User ID</label>
                    <input 
                        type="text"
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)}  
                        placeholder=''/>
                </div>
                <div className="user">
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}  
                        placeholder=''/>
                </div>
                <div className="password">
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
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
