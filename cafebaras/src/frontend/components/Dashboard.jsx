import React, { useState } from "react"
import '../designs/Dashboard.css';
import Logo from '../assets/Cafelogo.png'
import Details from "./dashboardComponents/sidebars/details";


function Dashboard({id}){

    return(
        
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">
                    <img src={Logo} alt="cafebara logo" />
                </div>
                <Details setId={id}/>

            </div>
            <div className="content">
               
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