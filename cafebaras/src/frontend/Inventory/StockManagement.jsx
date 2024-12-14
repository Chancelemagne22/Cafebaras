import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
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
      
      try{
        const response = await fetch('http://localhost:3001/api/stocks');
        const data = await response.json()
        if (!data) {
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
      }catch(error){
        console.error('Error fecthing order: ', error)
        setLoading(false)
      }
      setLoading(false);
    };

    fetchStocks();
  }, []);

  const showResultDisplay = ()=>{
    setResultDisplay(true);
    console.log("Show Order Display state set to true");
  }
  console.log("numbercheck")

  // Dynamically set row classes based on Stocked_Units value
  const rowClassName = (data) => {
	let numberOfStocks = (data.Stocked_Units / 30) 
	console.log(data.Stocked_Units + "ito")
	console.log(numberOfStocks.toFixed(2))
    if (data.ItemCategory === "Packaging" && data.Stocked_Units < numberOfStocks) {
      return "low-stock"; // Red for low stock
    }
    if (data.ItemCategory !== "Packaging" && data.Stocked_Units < numberOfStocks) {
      return "low-stock"; // Red for low stock
    }
    return ""; // Default (no class)
  };

  console.log(selectedProduct)
  const getRow = async () => {
    if (selectedProduct != null){
      togglePopup();
      console.log("getRow got cliked")
      const stockinfo = Object.values(selectedProduct);
      console.log(stockinfo[5] + " in line 90")
      // Change this for the supplier ID
      const supID = stockinfo[5];
      setItem(stockinfo[2]);
      console.log(supID);
      try {
        const response = await fetch('http://localhost:3001/api/stocks/supplier',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({supID})
        });
        if(!response.ok){
          const errorData = await response.json();
          console.error('Transaction failed:', errorData);
          return;
        }
        const data = await response.json();
        console.log(data);
        const suppinfo = Object.values(data);
        setSname(suppinfo[1]);
        setSnumber(suppinfo[2]);
        setSemail(suppinfo[3]);
        
        
      }catch{
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

        const dataResupply = {orderDate, item, supplier, quantity, price}
        // Insert transaction into Supabase
        const response = await fetch('http://localhost:3001/api/stocks/resupply',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataResupply)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }else{
          alert("Resupply: Done")
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

    </div>
  );
}

export default StockManagement;