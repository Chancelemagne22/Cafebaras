import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function ItemManagement() {
  const [orderClassName, setClassName] = useState('Order hide');
  const [change, setChange] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Inventory");
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultDisplay, setResultDisplay] = useState(false); 
  const [message,setMessage] = useState("");
  const resultDisplayClass = resultDisplay ? 'resultDisplay show' : 'resultDisplay';
  const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
  };

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
    const fetchInventory = async () => {
      setLoading(true); // Set loading to true at the start of fetch
      try{
        const response = await fetch('http://localhost:3001/api/items/inventory');
        const data = await response.json()
        setInventory(data)
        setLoading(false); // Set loading to false after fetch
      }catch(error){
        console.error('Error fetching transaction: ', error)
        setLoading(false); // Set loading to false after fetch
      }
    };
    fetchInventory();
  }, []); // Ensuring fetch runs only once

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedOption === "Products") {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:3001/api/items/product');

          const data = await response.json()
          setProducts(data)
          setLoading(false); // Set loading to false after fetch
        }catch(error){
          console.error('Error fetching transaction: ', error)
          setLoading(false); // Set loading to false after fetch
        } finally {
          setLoading(false);
        }
      }  
    };
    
    fetchProducts();
  }, [selectedOption]); // Ensuring fetch runs only once

  const popup = async () => {
    togglePopup();
    try {
      const response = await fetch('http://localhost:3001/api/items',{
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
    }catch{
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

  const showResultDisplay = ()=>{
    setResultDisplay(true);
    console.log("Show Order Display state set to true");
  }

  const itemDelete = async () => {
    if (selectedProduct != null) {
      const info = Object.values(selectedProduct);
      const itemID = iteminfo[0];
      setMessage("Selected item is deleted");
      showResultDisplay();
      try {
        if (selectedOption === "Inventory") {
          const { error } = await supabase
            .from('inventory')
            .delete()
            .eq('itemID', itemID);
        
        if (error) {
          console.error("Error deleting data:", error);
        } else {
          console.log("A data has been deleted");
          // Update the resupply state by removing the deleted item
          setInventory((prevInventory) => prevInventory.filter((item) => item.itemID !== itemID));
          setSelectedProduct(null); // Clear the selection
        }
      } else if (selectedOption === "Products") {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('productID', itemID);
        
          if (error) {
            console.error("Error deleting data from Products:", error);
          } else {
            console.log("Item deleted from Products");
            setProducts((prevProducts) => prevProducts.filter((product) => product.productID !== itemID));
            setSelectedProduct(null);
          }
        }  
      } catch (err) {
        console.error("Error occurred during deletion:", err);
      }
    } else {
      console.log("No selected data");
      setMessage("No Selected Data");
      showResultDisplay();
    }
  };

  return (
    <div className="itemmanagement">
        <div className="dropdown-container">
            <select value={selectedOption} onChange={handleDropdownChange} className="dropdown">
                <option value="Inventory">Inventory</option>
                <option value="Products">Products</option>
            </select>
        </div>
        
        <div className="table-container">
            <div className="tablebg">    
                <div className='table'>
                  {selectedOption === "Inventory" ? (
                    <DataTable 
                        className="inventory-table" 
                        value={inventory} 
                        loading={loading} 
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 20]}
                        selectionMode="single"
                        selection={selectedProduct}
                        onSelectionChange={(e) => setSelectedProduct(e.value)}
                        dataKey="itemID"
                        metakey="true"
                        autolayout="true"
                    >
                        <Column className="datas" field="itemID" header="Item Code"/>
                        <Column className="datas" field="ItemName" header="Item Name"/>
                        <Column className="datas" field="ItemCategory" header="Category"/>
                        <Column className="datas" field="Unit" header="Unit"/>
                        <Column className="datas" field='Unit Cost' header="Unit Cost"/>
                        <Column className="datas" field='Supplier_ID' header="Supplier"/>
                    </DataTable>
                  ) : (
                    <DataTable 
                        className="products-table" 
                        value={products} 
                        loading={loading} 
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 20]}
                        selectionMode="single"
                        selection={selectedProduct}
                        onSelectionChange={(e) => setSelectedProduct(e.value)}
                        dataKey="productID"
                        metakey="true"
                        autolayout="true"
                    >
                        <Column className="datas" field="productID" header="Product ID"/>
                        <Column className="datas" field="productName" header="Product Name"/>
                        <Column className="datas" field="recipeID" header="Recipe ID"/>
                        <Column className="datas" field='price' header="Price"/>
                    </DataTable>
                  )}
                </div> 
            </div>
        </div>

        <div className = {orderClassName} id = "ResupplyPop">
          <div className = "orderContent" id = "rec3">
            <h1 id = "orderText">Add Item</h1>
            <div className="orderDetails">
              <div className="sectionPay">
                <div className="SupplierInfo">
                  <div>
                    <label>Item Name:</label>
                    <input 
                      type="text"
                      autoComplete="off"/>
								  </div> 
                  <div>
                    <label>Category:</label>
                    <input 
                      type="text"
                      autoComplete="off"/>
								  </div> 
                  <div>
                    <label>Unit:</label>
                    <input 
                      type="text"
                      autoComplete="off"/>
								  </div> 
                  <div>
                    <label>Unit Cost:</label>
                    <input 
                      type="text"
                      autoComplete="off"
                      placeholder='Enter price per unit'/>
								  </div> 
                </div>
                <div className="buttons">
                  <button className = "purchase_button" id = "orderSupply">Add Item</button>    
                  <button className = "close_btn" onClick={togglePopup}><span className="close">&times;</span></button>
                </div>
              </div>
            </div>                       
          </div>
        </div>
        <div className = {resultDisplayClass}>
          <h1>{message}</h1>
        </div> 
        <div className = "button-container">
            <Button onClick={popup} className = "add-button">+ Add Item</Button>
            <Button onClick={itemDelete} className = "remove-button" >- Remove Item</Button>
        </div>    
    </div>
  );
}

export default ItemManagement