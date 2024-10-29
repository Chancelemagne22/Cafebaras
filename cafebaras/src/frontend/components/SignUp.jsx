import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/SignUp.css';

function SignUpPage() {
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
            const response = await axios.post('http://localhost:3001/api/signup', { username, password });
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

    return (
        <div className='containerS'>
            <div className="userS">
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    type="text"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}  
                />
            </div>
            <div className="passwordS">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={handleSignup}>Create Account</button>
            {error && <p className="error" style={{ color: '#4E2603' }}>{error}</p>}
        </div>
    );
}

export default SignUpPage;
