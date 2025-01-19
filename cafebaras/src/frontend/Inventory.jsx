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

    
  
    // Simulate notifications (you can replace this with actual logic)
    // let notificationCount = 0;
    // setInterval(() => {
    //   notificationCount = Math.floor(Math.random() * 10); // Simulate new notifications
    //   updateBadge(notificationCount);
    // }, 5000); // Update every 5 seconds
    //document.getElementById('n-badge').classList.add('show');
    //const [stocks, setStocks] = useState([]);
    const [lowStockCount, setLowStockCount] = useState(0);  // Store the count of low stock items
  
    useEffect(() => {
      const fetchStocks = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/stocks");
          const data = await response.json();
          console.log("Fetched Data:", data);
  
          if (Array.isArray(data) && data.length > 0) {
            // Count stocks with Stocked_Units less than lowStockQuantity
            const lowStockItems = data.filter(item => item.Stocked_Units < item.lowStockQuantity);
  
            // Set the count of low stock items
            setLowStockCount(lowStockItems.length);
  
            // Log the count (you can use this value to trigger the badge update)
            console.log("Low Stock Count:", lowStockItems.length);
  
            // Optionally update the badge based on the count
            updateBadge(lowStockItems.length);
          } else {
            console.error("Unexpected data structure:", data);
          }
        } catch (error) {
          console.error("Error fetching Stocks:", error);
        }
      };
  
      // Fetch the stock data initially
      fetchStocks();
  
      // Periodically fetch the data (every 5 seconds in this case)
      // const interval = setInterval(fetchStocks, 5000);
  
      // return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    // Function to update the badge based on the low stock count
    function updateBadge(count) {
      const badge = document.getElementById('n-badge');
  
      if (count > 0) {
        badge.classList.add('show'); // Show the badge
        badge.textContent = count;  // Update the count text
      } else {
        badge.classList.remove('show'); // Hide the badge if no low stock
      }
    }
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
                    <span className="badge" id="n-badge">!</span>
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
                    <div className="backInventory" onClick={() => {navigate('/dashboard')}}>
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