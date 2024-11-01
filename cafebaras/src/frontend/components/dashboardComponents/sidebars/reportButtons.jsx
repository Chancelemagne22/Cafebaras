import React, { useState } from "react";




function ReportButton(setLogo, setToHome){

    return (
        <>
            <div className="logo">
                <img src={setLogo} alt="cafebara logo" />
            </div>
            <div className="salesReport" >
                <p>Sales Report</p>
            </div>
            <div className="transaction">
                <p>Transaction History</p>
            </div>
            <div className="profitLossStatement">
                <p>Profit and Loss Statement</p>
            </div>
            <div className="inventoryReport">
                <p>Inventory Report</p>
            </div>
            <div className="back" onClick={() => setToHome("module") }>Back</div>
        </>
    );
}


export default ReportButton


