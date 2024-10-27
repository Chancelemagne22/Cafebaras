import React, { useState } from "react"
import '../designs/Dashboard.css';
import Logo from '../assets/Cafelogo.png'

function Dashboard({id}){

    

    return(
        
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">
                    <img src={Logo} alt="cafebara logo" />
                </div>
                <div className="info">
                    <p>CASHIER ID :</p>
                    <p>{id}</p>
                </div>
                <div className="submods">
                    <div className="about">ABOUT</div>
                    <div className="settings">SETTINGS</div>
                    <div className="logout">LOGOUT</div>
                </div>
                

            </div>
            <div className="content">
                <div className="header">
                    <p>CAFEBARAS</p>
                </div>
                <div className="main-content">
                    <div className="modules"></div>
                    <div className="modules"></div>
                    <div className="modules"></div>
                    <div className="modules"></div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard