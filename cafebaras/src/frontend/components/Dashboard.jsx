import React, { useState, useEffect } from "react"
import '../designs/Dashboard.css';
import '../designs/details.css';
import '../designs/modules.css';
import Details from "./dashboardComponents/sidebars/details";
import Module from "./dashboardComponents/mainContents/module";
import ItemManagement from "./ItemManagement";
import Logo from '../assets/Cafelogo.png';


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
                <Details setId={userId} setLogo={Logo}/>        
            </div>
            <div className="content">
                {activeModule === "module" && (
                    <Module
                        selectedModule={setActiveModule} 
                    />
                )}
                {activeModule === "inventory" && <ItemManagement id={userId} />}
                {/* {activeModule === "salesManagement" && <SalesManagement id={userId} />}
                {activeModule === "employees" && <Employees id={userId} />}
                {activeModule === "report" && <ReportAnalysis id={userId} />} */}
            </div>
        </div>
    )
}

export default Dashboard