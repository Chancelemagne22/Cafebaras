import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/Signup.css'

function SignUpPage() {
    const [userId, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const isValidInput = (input) => input && input.trim().length > 0;

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isValidInput(username) || !isValidInput(password)) {
            setError('Username and password cannot be empty or just spaces.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/signup', { userId, username, password });
            if (response.data.success) {
                navigate('/');
            } else {
                setError('Account creation failed. Please try again.');
            }
        } catch (err) {
            console.error("Error during signup:", err.response ? err.response.data : err.message);
            setError('Account creation failed. Please try again.');
        }
    };

    const onlyNumber = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input)) {
            setUserID(input);
            setError('')
        }
    };

    
   

    return (
        <div className="bodySignContainer">
            <div className="signupContainer">
                <div className="signID">
                    <label htmlFor="userID">User ID</label>
                    <input type="text"
                        id='userID'
                        value={userId}
                        autoComplete="off"

                        required minLength={4} maxLength={6}
                        onChange={onlyNumber}
                    />
                </div>
                <div className="signUsername">
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username"
                        type="text"
                        value={username} 
                        autoComplete="off"

                        onChange={(e) => setUsername(e.target.value)}  
                    />
                </div>
                <div className="signPass">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSignup}>Create Account</button>
                {error && <p className="signError" style={{ color: '#ff5745' }}>{error}</p>}
            </div>
        </div>
        
            
        
            
    );
}

export default SignUpPage;
