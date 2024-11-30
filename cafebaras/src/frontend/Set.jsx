import React, {useEffect, useState}from 'react'
import '../designs/Settings.css'
// import axios from 'axios';
import CafeLogo from './assets/CafeLogo.png'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
// import supabase from './settings';
// import { DataTable } from 'primereact/datatable';

function Settings() {

  const [userID, setUserID] = useState(localStorage.getItem('userID') || '');

  useEffect(() => {
    const storedId = localStorage.getItem('userID');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        navigate('/');
    } else {
        setUserID(storedId);
    }
  }, []);

  const {id} = useParams();
  const [values, setValues] = useState({
    uuid: id,
    username: '',
    password: ''
  })
  

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }


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
              <p>Current USER: </p>
              <p>{userID}</p>
              {/* <p>{userName}</p> */}
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='name' htmlFor='username'>USERNAME: </label>
                <input type="text" 
                  name = 'username' 
                  className='form-control' 
                  placeholder='Enter Username'
                  value={values.username}
                  autoComplete="off"

                  onChange={e => setValues({...values, username: e.target.value})}/>
              </div>
              <div>
                <label className='name' htmlFor='password'>PASSWORD: </label>
                <input type="text" 
                  name = 'password' 
                  className='form-control' 
                  placeholder='Enter Password'
                  value={values.password}
                  autoComplete="off"
                  
                  onChange={e => setValues({...values, password: e.target.value})}/>
              </div><br />
              <button className='update_btn'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings