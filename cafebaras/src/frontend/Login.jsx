import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/Login.css'

function LoginPage() {
    const [userID, setUserID] = useState(''); 
    // const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const createAccount = () => {
        navigate('/signup');
    };

    const protectedRoute = () => {
        localStorage.getItem('isAuthenticated') === 'true';
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 
    
        try {
            const response = await axios.post('http://localhost:3001/api/login', { userID,  password });
            
            if (response.data.success) {
                localStorage.setItem('userID', userID);
                // localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('isAuthenticated', 'true'); 
                protectedRoute()
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
        <div className="bodyContainer">
            <div className='container'>
                <p className='welcome'>WELCOME TO CAFEBARAS</p>
                <div className="form">
                    <p className='lts'>Login to system</p>

                    <div className="userID">
                        <label htmlFor="userId">User ID</label>
                        <input 
                            type="text"
                            id="userId"
                            value={userID} 
                            autoComplete="off"
                            onChange={(e) => setUserID(e.target.value)}  
                            placeholder=''/>
                    </div>
                    {/* <div className="user">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username} 
                            autoComplete="off"

                            onChange={(e) => setUsername(e.target.value)}  
                            placeholder=''/>
                    </div> */}
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
                
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                <div className="newAccountBtn">
                    <p>Still no account?</p>
                    <button onClick={createAccount}>Create an account</button>
                </div>
            </div>
        </div>
        
    );
}

export default LoginPage;
