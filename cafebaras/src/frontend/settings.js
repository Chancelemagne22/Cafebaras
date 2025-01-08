<<<<<<< HEAD
export { Settings } from './Set.jsx'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

=======
import React, {useEffect, useState}from 'react'
import '../designs/Settings.css'
import axios from 'axios';
import CafeLogo from './assets/CafeLogo.png'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
// import supabase from './settings';
// import Settings from './Set.jsx';

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
  // const [username, setUserName] = useState('')
  // const [password, setPassword] = useState('')
  
  useEffect(() => {

  //   const fetchUsers = async () => {
  //     const {data, error} = supabase
  //     .from('users')
  //     .select()
  //     .eq('id', id)
  //     .single()

  //     if (error) {
  //       navigate('/', {replace: true})
  //     }
  //     if (data) {
  //       setUserName(data.username)
  //       setPassword(data.password)
  //       console.log(data)
  //     }
  //   }

  //   fetchUsers()
    axios.get('http://localhost:3001/api/settings' + id)
    .then(res => {
      setValues({...values, username: res.data.username, password: res.data.password})
    })
    .catch(err => console.log(err))
  },[])

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/settings' + id, values)
    .then(res => {
      navigate('/');
    })
    .catch(err => console.log(err))
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
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='name' htmlFor='username'>New USERNAME: </label>
                <input type="text" 
                  name = 'username' 
                  className='form-control' 
                  placeholder='Enter Username' // dapat nakalagay yung lumang username
                  // value={username}
                  value={values.username}
                  autoComplete="off"

                  // onChange={e => setUserName(e.target.value)}
                  onChange={e => setValues({...values, username: e.target.value})}
                  />
              </div>
              <div>
                <label className='name' htmlFor='password'>New PASSWORD: </label>
                <input type="text" 
                  name = 'password' 
                  className='form-control' 
                  placeholder='Enter Password' // dapat nakalagay ang lumang password
                  // value={password}
                  value={values.password}
                  autoComplete="off"
                  
                  // onChange={e => setPassword(e.target.value)}
                  onChange={e => setValues({...values, password: e.target.value})}
                  />
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
>>>>>>> 007390953f31269c75702c18c02019f3cc6c66bc
