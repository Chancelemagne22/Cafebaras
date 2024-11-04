import ItemManagement from "../InventoryManagement/itemManagement";
import StockManagement from "./stockManagement";
import SupplierManagement from "./supplierManagement";

function InventoryManagement({ activeInventory }) {
    return (
        <>
            {activeInventory === "itemManagement" && <ItemManagement />}
            {activeInventory === "stockManagement" && <StockManagement />}
            {activeInventory === "supplierManagement" && <SupplierManagement />}
        </>
    );
}

export default InventoryManagement;
