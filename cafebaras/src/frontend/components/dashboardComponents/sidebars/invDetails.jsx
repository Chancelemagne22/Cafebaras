import React, { useState } from "react";

function InvDetails ({setToHome, setColor, setActiveInventory}){
    const [activeButton, setActiveButton] = useState('salesReport'); 

    const colorButton = (buttonName) => {
        setActiveButton(buttonName);
        setActiveInventory(buttonName); // Update active report in Dashboard
    };

    return (
        <>
            <div 
                className={`inventoryButton ${activeButton === 'itemManagement' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('itemManagement')}
            >
                <p>Item Management</p>
            </div>
            <div 
                className={`inventoryButton ${activeButton === 'stockManagement' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('stockManagement')}
            >
                <p>Stock Management</p>
            </div>
            <div 
                className={`inventoryButton ${activeButton === 'supplierManagement' ? 'active' : 'inactive'}`} 
                onClick={() => colorButton('supplierManagement')}
            >
                <p>Supplier Management</p>
            </div>

            <div className="back" onClick={() => { setToHome("module"); setColor("sidebar"); setActiveInventory("itemManagement");}}>
                Back
            </div>
        </>
    )
}

export default InvDetails;