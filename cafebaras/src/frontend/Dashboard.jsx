import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CafeLogo from './assets/CafeLogo.png'
import InventoryGIF from './assets/Cafebara_Stocks.gif';
import SalesGIF from './assets/Cafebara_OrderM1.gif'
import ReportGIF from './assets/Cafebara_Report1.gif'
import '../designs/Dashboard.css'
// import { Link } from "react-router-dom";


function Dashboard() {
    const [userID, setUserID] = useState(localStorage.getItem('userID') || '');
   
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userID');
        localStorage.removeItem('isAuthenticated');
        console.log("done")
        navigate('/');
    };
    console.log('Check')


    useEffect(() => {
        const storedId = localStorage.getItem('userID');
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        } else {
            setUserID(storedId);
        }
    }, []);

    return (
        <div className="dashboard">
            <div className="sidebarDash">
                <div className="logo">
                    <img src={CafeLogo} alt="cafebara logo" />
                </div>
                <div className="info">
                    <p>CASHIER ID :</p>
                    <p>{userID}</p>
                </div>
                <div className="submods">
                    <div className="about">ABOUT</div>
                    <div className="settings" onClick={() => navigate('/settings')}>SETTINGS</div>
                    <div onClick={(e) => handleLogout()} className="logout">LOGOUT</div>
                </div>
            </div>
            <div className="mainContentDash">
                <div className="holder">
                    <div className="modules"  onClick={() => navigate('/order')}>
                        <p >ORDER MANAGEMENT</p>
                        <img src={SalesGIF} alt="Sales Management" />
                    </div>
                    <div className="modules" onClick={() => navigate('/inventory')}>
                        <p>INVENTORY</p>
                        <img src={InventoryGIF} alt="Inventory" />

                    </div>
                    <div className="modules"onClick={() => navigate('/report')}>
                        <p>SALES REPORT</p>
                        <img src={ReportGIF} alt="Report" />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
