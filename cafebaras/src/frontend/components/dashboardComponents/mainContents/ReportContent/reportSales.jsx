function SalesReport({setId}){
    return(
        <>
            <div className="salesContainer">
                <div className="dropdowns">
                    <div className="month"><p>Month</p></div>
                    <div className="year"><p>Year</p></div>
                </div>
                <div className="date"><p>Report for Date Period: January xx - February xx</p></div>
                <div className="label"><p>Profit Report</p></div>
                <div className="visualReport">
                    <div className="numbers"></div>
                    <div className="graphs"></div>
                </div>
            </div>
        </>
    )
}
 

export default SalesReport;