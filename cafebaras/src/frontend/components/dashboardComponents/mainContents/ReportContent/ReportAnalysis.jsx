import SalesReport from "../ReportContent/reportSales";
import TransactionHistory from "./TransactionHistory";
import ProfitLoss from "./ProfitLoss";
import InventoryReport from "./Inventory";

function ReportAnalysis({ activeReport }) {
    return (
        <>
            {activeReport === "salesReport" && <SalesReport />}
            {activeReport === "transaction" && <TransactionHistory />}
            {activeReport === "profitLoss" && <ProfitLoss />}
            {activeReport === "inventory" && <InventoryReport />}
        </>
    );
}

export default ReportAnalysis;
