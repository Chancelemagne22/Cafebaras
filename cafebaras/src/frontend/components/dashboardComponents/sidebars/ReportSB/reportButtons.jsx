import React, { useState } from 'react';

function ReportButton({ logo, setToHome, setColor, setActiveReport }) {
    const [activeButton, setActiveButton] = useState('salesReport'); 

    const colorButton = (buttonName) => {
        setActiveButton(buttonName);
        setActiveReport(buttonName); // Update active report in Dashboard
    };

    return (
        <>
            <div className="logo">
                <img src={logo} alt="cafebara logo" />
            </div>
            <div 
                className={`reportButton ${activeButton === 'salesReport' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('salesReport')}
            >
                <p>Sales Report</p>
            </div>
            <div 
                className={`reportButton ${activeButton === 'transaction' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('transaction')}
            >
                <p>Transaction History</p>
            </div>
            <div 
                className={`reportButton ${activeButton === 'profitLoss' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('profitLoss')}
            >
                <p>Profit and Loss Statement</p>
            </div>
            <div 
                className={`reportButton ${activeButton === 'inventory' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('inventory')}
            >
                <p>Inventory Report</p>
            </div>
            <div className="back" onClick={() => { setToHome("module"); setColor("sidebar"); setActiveReport("salesReport");}}>
                Back
            </div>
        </>
    );
}

export default ReportButton;
