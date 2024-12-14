import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import supabase from "./inventory";

function StockManagement() {
  const [orderClassName, setClassName] = useState('Order hide');
  const [change, setChange] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [item, setItem]= useState();
  const [supplier, setSname] = useState();
  const [snumber, setSnumber] = useState();
  const [semail, setSemail] = useState();
  const [resultDisplay, setResultDisplay] = useState(false); 
  const resultDisplayClass = resultDisplay ? 'resultDisplay show' : 'resultDisplay';

  useEffect(() => {
    if (resultDisplay) {
        const timer = setTimeout(() => {
            setResultDisplay(false);
            console.log("Order display hidden after 20 seconds");
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [resultDisplay]);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      let { data, error } = await supabase
      .from("inventoryV2")
      .select("*");

      if (error) {
        console.error("Error fetching Stocks:", error);
      } else {
        // Sort the data so red rows appear at the top
        const sortedData = data.sort((a, b) => {
          const isALowStock =
            (a.ItemCategory === "Packaging" && a.Stocked_Units < 500) ||
            (a.ItemCategory !== "Packaging" && a.Stocked_Units < 2500);

          const isBLowStock =
            (b.ItemCategory === "Packaging" && b.Stocked_Units < 500) ||
            (b.ItemCategory !== "Packaging" && b.Stocked_Units < 2500);

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

  const showResultDisplay = ()=>{
    setResultDisplay(true);
    console.log("Show Order Display state set to true");
  }

  // Dynamically set row classes based on Stocked_Units value
  const rowClassName = (data) => {
    if (data.ItemCategory === "Packaging" && data.Stocked_Units < 500) {
      return "low-stock"; // Red for low stock
    }
    if (data.ItemCategory !== "Packaging" && data.Stocked_Units < 2500) {
      return "low-stock"; // Red for low stock
    }
    return ""; // Default (no class)
  };
  console.log(selectedProduct)

  const getRow = async () => {
    if (selectedProduct != null){
      togglePopup();
      console.log("I got clicked HAHAHAHA")
      const stockinfo = Object.values(selectedProduct);
      const supID = stockinfo[5];
      setItem(stockinfo[2]);
      console.log(supID);
    try {
      const { data,error } = await supabase
            .from('suppliers')
            .select('*')
            .eq('supplierID', supID )
            .single();

            if (error){
                console.error("Error fetching Products:", error);
            }
            else{
                console.log(data);
            }
            const suppinfo = Object.values(data);
            setSname(suppinfo[1]);
            setSnumber(suppinfo[2]);
            setSemail(suppinfo[3]);
      }
    catch{

        }
      }else{
        console.log("No selected product")
      }
    }
    
  const togglePopup = async (e) => {
        
    if(change){
        setClassName('Order show') 
        setChange(false)
    }else{
        setClassName('Order hide')
        setChange(true)
    }
}
const orderSupply = async() =>{
console.log("I have been clicked")
showResultDisplay();
togglePopup();
setSelectedProduct(null);
try{
  const quantinput = Number(quantity);
  const priceinput = Number(price);
  console.log(quantinput,priceinput);
  if (isNaN(quantinput) || isNaN(priceinput)){
    console.log("No Order",supplier);
    }
  if(quantinput<=0||priceinput<=0){
    console.log("Invalid Order");
  }else{
      console.log(quantity,price,supplier);
      try {
        const dateObj = new Date();
        const month   = dateObj.getUTCMonth() + 1; // months from 1-12
        const day     = dateObj.getUTCDate();
        const year    = dateObj.getUTCFullYear();

        const orderDate = month + "/" + day + "/" + year;

        // Insert transaction into Supabase
        const { error } = await supabase
        .from('resupply')
        .insert([{ orderDate, item, supplier, quantity, price }]);

        if (error) {
            console.error("Error Resupply:", error);
            return res.status(400).json({
                error: 'Ordering Resupply failed.',
                details: error.message,
            });
        }
    } catch (err) {
        console.error("Unexpected error during Ordering Supply:", err);
    }
  }
    setQuantity("");
    const inputQuantity = document.getElementById("qty");
      inputQuantity.value = "";
    setPrice("");
    const inputPrice = document.getElementById("price");
      inputPrice.value = "";
    
}
catch{
  
}

}

  return (
    <div className="resupplymanagement">
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
              dataKey="itemID"
              metaKey="true"
              rowClassName={rowClassName} // Add rowClassName property
            >
              <Column className="datas" field="itemID" header="Item Code" />
              <Column className="datas" field="ItemCategory" header="Category" />
              <Column className="datas" field="ItemName" header="Item Name" />
              <Column className="datas" field="Unit" header="Unit" />
              <Column className="datas" field="Stocked_Units" header="Stocked Units"/>
              <Column className="datas" field="Used_Units" header="Used Units" />
            </DataTable>
          </div>
        </div>
      </div>
      <div className="stkMgmtLowPart">
        <div>
      <p>ITEMS THAT ARE IN RED NEEDS IMMEDIATE RESTOCKING</p>
      </div>
      <div className="OrderSupplyBox">
        <button className="order-button" onClick={getRow}>Order Supply</button>
      </div>
      </div>
      <div className = {orderClassName} id = "ResupplyPop">
                    <div className = "orderContent" id = "rec3">
                        <h1 id = "orderText">Contact Supplier</h1>
                        <div className="orderDetails">
                          <div className="supplierDetails">
                            <div className = "selectedOrder" id = "circle2"><p>Avatar</p></div>
                                  <div><p>Supplier Name: {supplier}</p> </div>  
                            </div>
                            <div className="sectionPay">
                            <div className="SupplierInfo">
                              <p>Supplier Number: {snumber}</p>
                                  <p>Supplier email: {semail}</p>
                                  <p>Order Supply for</p>
                                  <p>{item}</p>
                        <div>
                        <label>Quantity:</label>
                        <input 
                            type="text"
                            id="qty"
                            value={quantity} 
                            autoComplete="off"
                            onChange={(e) => setQuantity(e.target.value)}  
                            placeholder=''/> <label>per unit</label>
                        </div>  
                        <p></p> 
                        <div>
                        <label>Total Price:</label>
                        <input 
                            type="text"
                            id="price"
                            value={price} 
                            autoComplete="off"
                            onChange={(e) => setPrice(e.target.value)}  
                            placeholder=''/>
                        </div>
                    </div>
                                <div className="buttons">
                                    <button className = "purchase_button" id = "orderSupply" onClick={orderSupply}>Order Supply</button>    
                                    <button className = "close_btn" onClick={togglePopup}>&times;</button>
                                </div>
                            </div>
                        </div>                       
                    </div>
                </div>
                <div className = {resultDisplayClass}>
                <h1>Order for resupply has been made</h1>
                </div>
    </div>
  );
}

export default StockManagement;