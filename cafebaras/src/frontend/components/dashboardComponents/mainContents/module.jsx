function Module({selectedModule}){


   
    return (
    <div className="main-content">
        <div className="modules" onClick={() => selectedModule("sales")}><p>SALES MANAGEMENT</p></div>
        <div className="modules" onClick={() => selectedModule("inventory")}><p>INVENTORY</p></div>
        <div className="modules" onClick={() => selectedModule("employees")}><p>EMPLOYEES</p></div>
        <div className="modules"onClick={() => selectedModule("report")}><p>REPORT ANALYSIS</p></div>
    </div>)
}


export default Module;