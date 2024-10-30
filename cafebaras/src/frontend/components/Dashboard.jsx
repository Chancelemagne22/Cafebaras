import React, { useState, useEffect } from "react"
import '../designs/Dashboard.css';
import '../designs/details.css';
import Logo from '../assets/Cafelogo.png';
import Details from "./dashboardComponents/sidebars/details";
import Module from "./dashboardComponents/mainContents/module";


function Dashboard({id}){
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');


    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        if (!storedId) {
            navigate('/');
        } else {
            setUserId(storedId);
        }
    }, []);

    return(
        
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">
                    <img src={Logo} alt="cafebara logo" />
                </div>
                <Details setId={userId}/>

            </div>
            <div className="content">
                <Module />
            </div>
        </div>
    )
}

export default Dashboard