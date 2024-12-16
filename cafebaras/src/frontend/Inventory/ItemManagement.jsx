import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function ItemManagement() {
  const [selectedOption, setSelectedOption] = useState("Inventory");
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true); // Set loading to true at the start of fetch
      try{
        const response = await fetch('http://localhost:3001/api/items');

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
          const response = await fetch('http://localhost:3001/api/items');

          const data = await response.json()
          setProducts(data)
          setLoading(false); // Set loading to false after fetch

        } catch(error) {
          console.error('Error fetching transaction: ', error)
          setLoading(false); // Set loading to false after fetch
          
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchProducts();
  }, [selectedOption]);

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
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        autoLayout={true}
                    >
                        <Column className="datas" field="itemID" header="Item Code"/>
                        <Column className="datas" field="ItemName" header="Item Name"/>
                        <Column className="datas" field="ItemCategory" header="Category"/>
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
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        autoLayout={true}
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
        
        <div className = "button-container">
            <Button className = "add-button">+ Add Item</Button>
            <Button className = "remove-button" >- Remove Item</Button>
        </div>    
    </div>
  );
}

export default ItemManagement