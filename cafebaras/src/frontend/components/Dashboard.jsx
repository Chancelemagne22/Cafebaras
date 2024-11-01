import React, { useState, useEffect } from "react"
import '../designs/Dashboard.css';
import '../designs/details.css';
import '../designs/modules.css';
import Module from "./dashboardComponents/mainContents/module";
import ItemManagement from "./ItemManagement";
import Logo from '../assets/Cafelogo.png';
import Details from "./dashboardComponents/sidebars/details";
import InvDetails from "./dashboardComponents/sidebars/invDetails";
import SalesReport from "./dashboardComponents/mainContents/reportSales";
import ReportButton from "./dashboardComponents/sidebars/reportButtons";




function Dashboard({id}){
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [activeModule, setActiveModule] = useState('module');


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
                {activeModule === "module" && (
                    <Details  
                        setId={userId}
                        setLogo={Logo}
                    />
                )}
                {activeModule === "inventory" && <InvDetails setId={userId} setToHome={setActiveModule}/>}
                {activeModule === "report" && <ReportButton setId={userId} setToHome={setActiveModule}/>}
                
                      
            </div>
            <div className="content">
                {activeModule === "module" && (
                    <Module
                        selectedModule={setActiveModule} 
                    />
                )}
                {activeModule === "inventory" && <ItemManagement id={userId} />}
                {/* {activeModule === "salesManagement" && <SalesManagement id={userId} />} */}
                {/* {activeModule === "employees" && <Employees id={userId} />} */}
                {activeModule === "report" && <SalesReport  />}
            </div>
        </div>
    )
}

export default Dashboard