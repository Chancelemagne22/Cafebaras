import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../designs/SignUp.css';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const  navigate = useNavigate(); 

    const isValidInput = (input) => {
        return input && input.trim().length > 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isValidInput(username) || !isValidInput(password)) {
            setError('Username and password cannot be empty or just spaces.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/signup', {
                username: username,
                password: password 
            });
            console.log("Response from server:", response.data);
            

            if (response.data.success) {

                navigate('/login');
            }
        } catch (err) {
            console.error("Error during signup:", err.response ? err.response.data : err.message);
            setError('Account creation failed. Please try again.');
        }
    };

    return (
        <div className='container'>
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

            <button onClick={handleSignup}>Create Account</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
     
    );
}

export default SignUpPage;
