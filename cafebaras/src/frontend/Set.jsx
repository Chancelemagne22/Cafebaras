import React, {useEffect, useState}from 'react'
import '../designs/Settings.css'
import axios from 'axios'
import CafeLogo from './assets/CafeLogo.png'
import { useNavigate } from 'react-router-dom';


function Settings() {

  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [loading, setLoading] = useState(true);
  const [curPass, curPassword] = useState()
  const [curUser, curUsername] = useState()
  const [error, setError] = useState('');
  // const [name, setName] = useState();
  // const [pass, setPass] = useState();
  // const [menu, setMenu] = useState();

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
  }, []);

  useEffect(() => {
    setUsername(curUser);
    setPassword(curPass);
  },[])
  
  const navigate = useNavigate()
  const setUpdate = {userID, username, password}

  // Hinde nagana pag fetch
  const handleFetch = async (e) => {
    e.preventDefault();
    setError('');

    // Validate input before making the request
    // if (!name || !pass) {
    //     setError('Username and password are required.');
    //     return;
    // }

    try {
      const response = await axios.get('http://localhost:3001/api/settings', { userID, username, password });
      
      if (response.data.success) {

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

    } catch {
      console.error('Error during fetching:');
    }
  }

  // useEffect(() => {
  //         const fetchUsers = async () => {
  //             setLoading(true); // Set loading to true at the start of fetch
  //             try{
  //                 const response = await fetch('http://localhost:3001/api/settings');
  //                 const data = await response.json()
  
  //                 setMenu(data)
  //                 // if (response.data.success) { 
  //                 //         setMenu(username);
  //                 //         console.log(menu);
  //                 //           protectedRoute()
  //                 //           navigate('/');
  //                 //       } else {
  //                 //           setError('Fetch failed. Please check your credentials.');
  //                 //       }
  //             }catch(error){
  //                 console.error('Error fecthing users: ', error)
  //                 setLoading(false)
  //             }
          
  //         };
      
  //     fetchUsers();
  //     }, []);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any existing errors

    try {
      const response = await fetch('http://localhost:3001/api/settings/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setUpdate),
      },{username, password})

    // try {
    //   const response = await axios.put('http://localhost:3001/api/settings/update', {username, password})
      
      const result = await response.json();

      if (response.ok) {
        console.log('User updated successfully:', result);
        alert('User updated successfully!');
      } else {
        console.error('Error updating user:', result);
        alert(`Error: ${result.error}`);
      }
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
              <p>Current USER: {userID}</p>
              <p>Current Username: {curUser}</p>
              <p>Current password: {curPass}</p>
            </div>
            </div>
            <div>
    </div>
            <form onSubmit={handleFetch}>
              <div>
                <label className='name' htmlFor='username'>New USERNAME: </label>
                <input type="text" 
                  name = 'username' 
                  className='form-control' 
                  placeholder='Enter Username' // dapat nakalagay yung lumang username
                  value= {username}
                  autoComplete="off"

                  onChange={(e) => setUsername(e.target.value)}  
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
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default Settings