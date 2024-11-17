function Module({selectedModule}){


   
    return (
    <div className="main-content" >
        <div className="moduleHolder">
            <div className="modules" onClick={() => selectedModule("sales")}><p>SALES MANAGEMENT</p></div>
            <div className="modules" onClick={() => selectedModule("inventory")}><p>INVENTORY</p></div>
            <div className="modules"onClick={() => selectedModule("report")}><p>REPORT ANALYSIS</p></div>
        </div>
    </div>)
}


export default Module;