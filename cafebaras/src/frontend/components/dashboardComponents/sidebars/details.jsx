import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

function Details ({setId, setLogo}){



    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isAuthenticated');
        console.log("done")
        navigate('/');
    };
    return (
        <>
            <div className="logo">
                <img src={setLogo} alt="cafebara logo" />
            </div>
            <div className="info">
                <p>CASHIER ID :</p>
                <p>{setId}</p>
            </div>
            <div className="submods">
                <div className="about">ABOUT</div>
                <div className="settings">SETTINGS</div>
                <div onClick={(e) => handleLogout()} className="logout">LOGOUT</div>
            </div>
        </>
    )
}

export default Details;