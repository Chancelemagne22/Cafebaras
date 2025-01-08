import React, {useEffect, useState}from 'react'
import '../designs/Settings.css'

function Settings(){

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