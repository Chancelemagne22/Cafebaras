import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function ItemManagement() {
  const [orderClassName, setClassName] = useState('Order hide');
  const [change, setChange] = useState(true);
  const [selectedOption, setSelectedOption] = useState("Inventory");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [options, setOptions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultDisplay, setResultDisplay] = useState(false); 
  const [message,setMessage] = useState("");

  const [itemName,setItemName] = useState("");
  const [category,setCategory] = useState("");
  const [unit,setUnit] = useState("");
  const [unitCost,setUnitCost] = useState("");

  const [productName, setProductName] = useState("");
  const [recipeID, setRecipeID] = useState("");
  const [price, setPrice] = useState("");

  const resultDisplayClass = resultDisplay ? 'resultDisplay show' : 'resultDisplay';
  const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
  };
  const handleSupplierDropdown = (event) => {
    setSelectedSupplier(event.target.value);
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
        setLoading(true); // Set loading to true at the start of fetch
        try{
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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data, error } = await supabase
          .from('suppliers') // Replace with your table name
          .select('supplierID'); // Replace with the column name you want to display

        if (error) throw error;

        setOptions(data); // Set the fetched data as options
      } catch (error) {
        console.error('Error fetching options:', error.message);
      }
    };

    fetchOptions();
  }, []);

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
  const addItem = async () => {
    try {
      const { error } = await supabase
        .from('inventoryV2')
        .insert([
          {
            ItemCategory: category,
            ItemName: itemName,
            Unit: unit,
            UnitCost: parseFloat(unitCost),
            Supplier_ID: selectedSupplier,
          }
        ]);
  
      if (error) {
        console.error("Error inserting item:", error);
      } else {
        console.log("Item added successfully!");
        setMessage("Item added successfully");
        showResultDisplay();
        resetForm();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const addProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([
          {
            productName,
            recipeID,
            price: parseFloat(price),
          }
        ]);
  
      if (error) {
        console.error("Error inserting product:", error);
      } else {
        console.log("Product added successfully!");
        setMessage("Product added successfully");
        showResultDisplay();
        resetForm();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  
  const itemDelete = async () => {
    if (selectedProduct != null) {
      const info = Object.values(selectedProduct);
      const itemID = info[0];
      setMessage("Selected item is deleted");
      showResultDisplay();
      try {
        if (selectedOption === "Inventory") {
          const { error } = await supabase
            .from('inventoryV2')
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
          .from('productsV4')
          .delete()
          .eq('pID', itemID);
        
          if (error) {
            console.error("Error deleting data from Products:", error);
          } else {
            console.log("Item deleted from Products");
            setProducts((prevProducts) => prevProducts.filter((product) => product.pID !== itemID));
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
  const resetForm = () => {
    setItemName("");
    setCategory("");
    setUnit("");
    setUnitCost("");
    setSelectedSupplier("");
    setProductName("");
    setRecipeID("");
    setPrice("");
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
                        <Column className="datas" field='UnitCost' header="Unit Cost"/>
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

        <div className={orderClassName} id="ResupplyPop">
  <div className="orderContent">
    <h1>{selectedOption === "Inventory" ? "Add Item" : "Add Product"}</h1>
    <div className="orderDetails">
      <div className="sectionPay">
        <div className="SupplierInfo">
          {selectedOption === "Inventory" ? (
            <>
              <div>
                <label>Item Name:</label>
                <input 
                  type="text" 
                  value={itemName} 
                  onChange={(e) => setItemName(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Category:</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Unit:</label>
                <input 
                  type="text" 
                  value={unit} 
                  onChange={(e) => setUnit(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Unit Cost:</label>
                <input 
                  type="text" 
                  value={unitCost} 
                  onChange={(e) => setUnitCost(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Supplier:</label>
                <select 
                  value={selectedSupplier} 
                  onChange={handleSupplierDropdown} 
                  className="dropdown"
                >
                  <option value="" disabled>
                    -- Select an option --
                  </option>
                  {options.map((option) => (
                    <option key={option.supplierID} value={option.supplierID}>
                      {option.supplierID}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label>Product Name:</label>
                <input 
                  type="text" 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Recipe ID:</label>
                <input 
                  type="text" 
                  value={recipeID} 
                  onChange={(e) => setRecipeID(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Price:</label>
                <input 
                  type="text" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
            </>
          )}
        </div>
        <div className="buttons">
          <button 
            className="purchase_button" 
            onClick={selectedOption === "Inventory" ? addItem : addProduct}
          >
            Add {selectedOption === "Inventory" ? "Item" : "Product"}
          </button>
          <button className="close_btn" onClick={togglePopup}>
            <span className="close">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
        <div className = "button-container">
        <Button onClick={togglePopup} className="add-button">+ Add {selectedOption === "Inventory" ? "Item" : "Product"}</Button>
            <Button onClick={itemDelete} className = "remove-button" >- Remove Item</Button>
        </div>
        <div className = {resultDisplayClass}>
          <h1>{message}</h1>
        </div> 
    </div>
  );
}

export default ItemManagement