import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import supabase from "./inventory";

function StockManagement() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      let { data, error } = await supabase.from("stocksV3").select("*");

      if (error) {
        console.error("Error fetching Stocks:", error);
      } else {
        // Sort the data so red rows appear at the top
        const sortedData = data.sort((a, b) => {
          const isALowStock =
            (a.Category === "Packaging" && a.Stocked_Units < 500) ||
            (a.Category !== "Packaging" && a.Stocked_Units < 2500);

          const isBLowStock =
            (b.Category === "Packaging" && b.Stocked_Units < 500) ||
            (b.Category !== "Packaging" && b.Stocked_Units < 2500);

          if (isALowStock && !isBLowStock) return -1; // a comes first
          if (!isALowStock && isBLowStock) return 1;  // b comes first
          return 0; // Keep original order if both have same priority
        });
        setStocks(sortedData);
      }
      setLoading(false);
    };

    fetchStocks();
  }, []);

  // Dynamically set row classes based on Stocked_Units value
  const rowClassName = (data) => {
    if (data.Category === "Packaging" && data.Stocked_Units < 500) {
      return "low-stock"; // Red for low stock
    }
    if (data.Category !== "Packaging" && data.Stocked_Units < 2500) {
      return "low-stock"; // Red for low stock
    }
    return ""; // Default (no class)
  };
  console.log(selectedProduct)
  const getRow = async () => {
    console.log("I got clicked HAHAHAHA")
    const stockinfo = Object.values(selectedProduct);
    const iName = stockinfo[3];
    console.log(iName);
  }
  return (
    <div className="stockmanagement">
      <div className="table-container">
        <div className="tablebg">
          <div className="table">
            <DataTable
              className="stocks-table"
              value={stocks}
              loading={loading}
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={10}
              selectionMode="single"
              selection={selectedProduct}
              onSelectionChange={(e) => setSelectedProduct(e.value)}
              dataKey="stockID"
              metaKey="true"
              rowClassName={rowClassName} // Add rowClassName property
            >
              <Column className="datas" field="stockID" header="Stock Code" />
              <Column className="datas" field="itemID" header="Item Code" />
              <Column className="datas" field="Category" header="Category" />
              <Column className="datas" field="Item_Name" header="Item Name" />
              <Column className="datas" field="Unit" header="Unit" />
              <Column
                className="datas"
                field="Stocked_Units"
                header="Stocked Units"
              />
              <Column className="datas" field="Used_Units" header="Used Units" />
              <Column className="datas" field="Units_Left" header="Units Left" />
            </DataTable>
          </div>
        </div>
      </div>
      <div className="stkMgmtLowPart">
        <div>
      <p>ITEMS THAT ARE IN RED NEEDS IMMEDIATE RESTOCKING</p>
      </div>
      <div className="OrderSupplyBox">
        <button onClick={getRow}>Order Supply</button>
      </div>
      </div>
    </div>
  );
}

export default StockManagement;