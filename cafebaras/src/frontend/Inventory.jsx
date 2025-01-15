import React, {useState, useEffect}from 'react'
import '../designs/Inventory.css'
import { useNavigate } from 'react-router-dom';
import { ItemManagement, StockManagement, SupplierManagement, ResupplyManagement } from './Inventory/inventory';

    
function Inventory(){
    const [activeButton, setActiveButton] = useState('itemManagement'); 
    const [activeInventory, setActiveInventory] = useState('itemManagement'); 
    
    const navigate = useNavigate();
    const colorButton = (buttonName) => {
        setActiveButton(buttonName);
        setActiveInventory(buttonName); 
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);


    return (
        <div className="dashboardInventory">
            <div className="sidebarInventory">
                <div 
                    className={`inventoryButton ${activeButton === 'itemManagement' ? 'active' : 'inactive'}`} 
                    onClick={() => colorButton('itemManagement')}
                >
                    ITEM MANAGEMENT
                </div>
                <div 
                    className={`inventoryButton ${activeButton === 'stockManagement' ? 'active' : 'inactive'}`} 
                    onClick={() => colorButton('stockManagement')}
                >
                    STOCK MANAGEMENT
                    <span class="badge" id="n-badge">!</span>
                </div>
                <div 
                    className={`inventoryButton ${activeButton === 'resupplyManagement' ? 'active' : 'inactive'}`} 
                    onClick={() => colorButton('resupplyManagement')}
                >
                    RESUPPLY MANAGEMENT
                </div>
                <div 
                    className={`inventoryButton ${activeButton === 'supplierManagement' ? 'active' : 'inactive'}`} 
                    onClick={() => colorButton('supplierManagement')}
                >
                    SUPPLIER MANAGEMENT
                </div>
                    <div className="back" onClick={() => {navigate('/dashboard')}}>
                        Back
                    </div>

            </div>

            <div className="mainContentInventory">
                <div className="activeContentInventory">
                    {activeInventory === "itemManagement" && <ItemManagement />}
                    {activeInventory === "stockManagement" && <StockManagement />}
                    {activeInventory === "supplierManagement" && <SupplierManagement />}
                    {activeInventory === "resupplyManagement" && <ResupplyManagement />}
                </div>
            </div>
        </div>
    )
}

export default Inventory