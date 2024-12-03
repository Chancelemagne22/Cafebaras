import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {Inventory, ProfitLoss, SalesReport, Transaction} from './ReportAnalysis/report';
import '../designs/ReportAnalysis.css'

function ReportAnalysis() {
    const [activeButton, setActiveButton] = useState('transaction')
    const [activeReport, setActiveReport] = useState('transaction')

    const navigate = useNavigate();
    const colorButton = (buttonName) => {
        setActiveButton(buttonName);
        setActiveReport(buttonName); 
    };


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);


    
    return (
        <div className="dashboardReport">
            <div className="sidebarReport">
                <div className={`reportButton ${activeButton === "transaction" ? 'active' : 'inactive'}`}
                onClick={()=> colorButton('transaction')}
                >
                    TRANSACTION HISTORY
                </div>
                <div className={`reportButton ${activeButton === "salesReport" ? 'active' : 'inactive'}`}
                onClick={()=> colorButton('salesReport')}
                >
                    SALES REPORT
                </div>
                <div className={`reportButton ${activeButton === "profitLoss" ? 'active' : 'inactive'}`}
                onClick={()=> colorButton('profitLoss')}
                >
                    PROFIT AND LOSS STATEMENT
                </div>
                <div className={`reportButton ${activeButton === "inventoryReport" ? 'active' : 'inactive'}`}
                onClick={()=> colorButton('inventoryReport')}
                >
                    INVENTORY REPORT
                </div>
                <div className="backReport" onClick={() => {navigate('/dashboard')}}>
                    Back
                </div>
            </div>
            <div className="mainContentReport">
                <div className="activeContentReport">
                    {activeReport === "transaction" && <Transaction />}
                    {activeReport === "salesReport" && <SalesReport/>}
                    {activeReport === "profitLoss" && <ProfitLoss/>}
                    {activeReport === "inventoryReport" && <Inventory/>}
                </div>

            </div>
        </div>
    )
}

export default ReportAnalysis