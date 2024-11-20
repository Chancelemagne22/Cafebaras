import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function ItemManagement() {
  const [selectedOption, setSelectedOption] = useState("Inventory");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true); // Set loading to true at the start of fetch
      let { data, error } = await supabase
        .from('inventory')
        .select('*');

      if (error) {
        console.error("Error fetching inventory:", error);
      } else {
        setInventory(data);
      }
      setLoading(false); // Set loading to false after fetch
    };
    
    fetchInventory();
  }, []); // Ensuring fetch runs only once
  console.log(inventory);

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
                </div> 
            </div>
        </div>
        
        <div className = "button-container">
            <Button className = "add-button">+ Add Item</Button>
            <Button className = "remove-button" >- Remove Item</Button>
        </div>    
    </div>
  )
}

export default ItemManagement