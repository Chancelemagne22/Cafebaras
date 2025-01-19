import React, {useEffect, useState}from 'react'
import '../designs/Settings.css'
import axios from 'axios'
import CafeLogo from './assets/CafeLogo.png'
import { useNavigate } from 'react-router-dom';


function Settings() {

  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [curPass, curPassword] = useState()
  const [curUser, curUsername] = useState()
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const protectedRoute = () => {
    localStorage.getItem('isAuthenticated') === 'true';
}

  useEffect(() => {
    const storedPass = localStorage.getItem('password');
    const storedName = localStorage.getItem('username');
    const storedId = localStorage.getItem('userID');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        navigate('/');
    } else {
        curPassword(storedPass);
        curUsername(storedName);
        setUserID(storedId);
    }
    console.log(isAuthenticated);
  }, [username, password]);

  useEffect(() => {
    setUsername(curUser);
    setPassword(curPass);
  },[setUsername, setPassword])
  
  const navigate = useNavigate()
  const setUpdate = {userID,  password}

  const handleFetch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); //Set loading to true at the start of fetch

    try {
      const response = await axios.post('http://localhost:3001/api/settings', { userID,  password });
      
      if (response.data.success) {

        localStorage.setItem('userId', UserActivation);
        localStorage.setItem('password', password);
        // const userUpdate = {...user, username: username}
        // setUpdate(userUpdate)

        protectedRoute()
        navigate('/');
      } else {
          setError('Fetch failed. Please check your credentials.');
      }
  
    if (response.status === 200 && response.data.success) {
      console.log('fetch successful:', response.data);

    } else {
      // Something else went wrong
      setError('An unexpected error occurred. Please try again.');
      console.log('Error occured')
    }

    setLoading(false); // Set loading to false after fetch

    } catch {
      console.error('Error during fetching:');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any existing errors
    setLoading(true); //Set loading to true at the start of fetch

    try {
      const response = await fetch('http://localhost:3001/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setUpdate),
      },{username, password})
      
      const result = await response.json();

      if (response.ok) {
        console.log('User updated successfully:', result);
        alert('User updated successfully!');
      } else {
        console.error('Error updating user:', result);
        console.log(setUpdate)
        alert(`Error: ${result.error}`);
      }

    setLoading(false); // Set loading to false after fetch

    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error occurred!');
    }

};




  return (
    <div>
      <div className='dashboardSettings'>
        <div className='settingsSideBar'>
          <div className="logoC">
            <img className='logo' src={CafeLogo} alt="cafebara logo" />
          </div>
          <div className="back" onClick={() => {navigate('/dashboard')}}>
            Back
          </div>
        </div>
        <div className='SetMain'> Update Login Credentials
          <div className='newLoginContainer'>
            <div>
              <div>

              <form onSubmit={handleFetch}></form>
                <p>Current USER: {userID}</p>
                
                <p 
                  value = {password}
                  loading ={loading}
                  onChange={(e)=> setPassword(e.target.value)}>Current password: {password}</p>
              </div>
            </div>
            <form onSubmit={handleFetch}>
              <div>
                <label className='name' htmlFor='username'>New User ID: </label>
                <input type="text" 
                  name = 'username' 
                  className='form-control' 
                  placeholder='Enter ID' // dapat nakalagay yung lumang username
                  value={username}
                  autoComplete="off"

                  onChange={(e) => setUserID(e.target.value)} 

                  />
              </div>
              <div>
                <label className='name' htmlFor='password'>New PASSWORD: </label>
                <input type="text" 
                  name = 'password' 
                  className='form-control' 
                  placeholder='Enter Password' // dapat nakalagay ang lumang password

                  value={password}
                  autoComplete="off"
                  
                  onChange={(e) => setPassword(e.target.value)} 
                  />
              </div><br />
              <button onClick={handleSubmit} className='update_btn'>Update</button>
            </form>
        </div>
        </div>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
  )
}

export default Settings
