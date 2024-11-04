import React, { useState, useEffect } from "react";
import '../designs/Dashboard.css';
import '../designs/details.css';
import '../designs/modules.css';
import '../designs/itemManagement.css';
import '../designs/salesreport.css';
import '../designs/transactionhistory.css'
import '../designs/profitloss.css'
import Module from "./dashboardComponents/mainContents/module";
import Logo from '../assets/Cafelogo.png';
import Details from "./dashboardComponents/sidebars/details";
import InvDetails from "./dashboardComponents/sidebars/invDetails";
import InventoryManagement from "./dashboardComponents/mainContents/InventoryManagement/inventoryManagement";
import ReportButton from "./dashboardComponents/sidebars/ReportSB/reportButtons";
import ReportAnalysis from "./dashboardComponents/mainContents/ReportContent/ReportAnalysis";


function Dashboard({ id }) {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [activeModule, setActiveModule] = useState('module');
    const [sidebarName, setSidebarName] = useState("sidebar");
    const [activeReport, setActiveReport] = useState("salesReport"); 
    const [activeInventory, setActiveInventory] = useState("itemManagement"); 

    useEffect(() => {
        const storedId = localStorage.getItem('userId');
        if (!storedId) {
            navigate('/');
        } else {
            setUserId(storedId);
        }
    }, []);

    return (
        <div className="dashboard">
            {/* Sidebar Section */}
            <div className={sidebarName}>
                {activeModule === "module" && (
                    <Details  
                        setId={userId}
                        setLogo={Logo}
                    />
                )}
                {activeModule === "inventory" && (
                    <InvDetails
                        setToHome={setActiveModule}
                        setColor={setSidebarName}
                        setActiveInventory={setActiveInventory} />
                    )}
                {activeModule === "report" && (
                    <ReportButton 
                        logo={Logo}
                        setToHome={setActiveModule}
                        setColor={setSidebarName}
                        setActiveReport={setActiveReport} // Pass setActiveReport to change report
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="content">
                {activeModule === "module" && (
                    <Module selectedModule={setActiveModule} />
                )}
                {activeModule === "inventory" && (
                    <InventoryManagement 
                        activeInventory={activeInventory} />
                )}
                {activeModule === "report" && (
                    <ReportAnalysis activeReport={activeReport} />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
