import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function ResupplyManagement() {
  const [resupply, setResupply] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultDisplay, setResultDisplay] = useState(false); 
  const resultDisplayClass = resultDisplay ? 'resultDisplay show' : 'resultDisplay';
  const [message,setMessage] = useState("");
  
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
    const fetchResupply = async () => {
      setLoading(true); // Set loading to true at the start of fetch
      let { data, error } = await supabase
        .from('resupply')
        .select('*');

      if (error) {
        console.error("Error fetching resupply:", error);
      } else {
        setResupply(data);
      }
      setLoading(false); // Set loading to false after fetch
    };
    
    fetchResupply();
  }, []); // Ensuring fetch runs only 
  
  const showResultDisplay = ()=>{
    setResultDisplay(true);
    console.log("Show Order Display state set to true");
  }

  const Delete = async () => {
    if (selectedProduct != null) {
      const resupplyinfo = Object.values(selectedProduct);
      const rsid = resupplyinfo[0];
      setMessage("Order for resupply is deleted");
      showResultDisplay();
      try {
        const { error } = await supabase
          .from('resupply')
          .delete()
          .eq('rsid', rsid);
        
        if (error) {
          console.error("Error deleting data:", error);
        } else {
          console.log("A data has been deleted");
          // Update the resupply state by removing the deleted item
          setResupply((prevResupply) => prevResupply.filter((item) => item.rsid !== rsid));
          setSelectedProduct(null); // Clear the selection
        }
      } catch (err) {
        console.error("Error occurred during deletion:", err);
      }
    } else {
      console.log("No selected data");
    }
  };
  const Received = async () => {
    if (selectedProduct != null) {
      const rsid = selectedProduct.rsid; // Access rsid directly from selectedProduct
      setMessage("Order is received. Stocks is updated");
      showResultDisplay();
      try {
        // Delete the selected product and return the deleted row
        const { data, error } = await supabase
          .from('resupply')
          .delete()
          .eq('rsid', rsid)
          .select(); // Ensure you retrieve the deleted data
  
        if (error) {
          console.error("Error deleting data:", error);
          return;
        }
  
        if (data.length > 0) {
          // Extract data from the deleted row
          const deletedRow = data[0];
          const { orderDate, item, supplier, quantity, price } = deletedRow;
  
          // Generate the dateReceived field
          const dateObj = new Date();
          const month = dateObj.getUTCMonth() + 1; // months are zero-based
          const day = dateObj.getUTCDate();
          const year = dateObj.getUTCFullYear();
          const dateReceived = month + "/" + day + "/" + year;
  
          // Insert into itemOverhead table
          const { error: insertError } = await supabase
            .from('itemOverhead')
            .insert([{ dateReceived, dateOrdered: orderDate, item, supplier, quantity, price }]);
  
          if (insertError) {
            console.error("Error inserting data into itemOverhead:", insertError);
            return;
          }
  
          console.log("Data successfully moved to itemOverhead.");
          // Update the table by removing the deleted item
          setResupply((prevResupply) => prevResupply.filter((item) => item.rsid !== rsid));
          setSelectedProduct(null); // Clear the selection

          try {
            // fetch data from Supabase
            const { data, error } = await supabase
            .from('inventoryV2')
            .select('Stocked_Units, Used_Units')
            .eq('ItemName', item);
        
            if (error) {
                console.error("Error On Fetching Stocks:", error);
                //continue;  Skip to the next iteration
            }
            const stockunit = data[0]?.Stocked_Units; // Access the specific number
            console.log("Number:", stockunit);
            const updated = stockunit + quantity;
            console.log("updated stocks",updated)

            try {
              const { data, error } = await supabase
                  .from('inventoryV2')
                  .update({Stocked_Units: updated})
                  .eq('ItemName', item);
  
              if (error) {
                  console.error("Error updating record:", error);
              } else {
                  console.log("Updated record:", data);
              }

          }catch{
          }
          }
          catch{
          }
        }
      } catch (err) {
        console.error("Unexpected error during operation:", err);
      }
    } else {
      console.log("No selected data");
    }

  };
  return (
    <div className="itemmanagement">
        <div className="table-container">
            <div className="tablebg">    
                <div className='table'>
                    <DataTable 
                        className="inventory-table" 
                        value={resupply} 
                        loading={loading} 
                        tableStyle={{ minWidth: "50rem" }}
                        paginator
                        rows={10}
                        selectionMode="single"
                        selection={selectedProduct}
                        onSelectionChange={(e) => setSelectedProduct(e.value)}
                        dataKey="rsid"
                        metaKey="true"
                    >
                        <Column className="datas" field="rsid" header="Supply Order ID"/>
                        <Column className="datas" field="orderDate" header="Date Ordered"/>
                        <Column className="datas" field="item" header="Item"/>
                        <Column className="datas" field='supplier' header="Supplier"/>
                        <Column className="datas" field='quantity' header="Quantity"/>
                        <Column className="datas" field='price' header="Price"/>
                    </DataTable>
                </div> 
            </div>
        </div>
        
        <div className = "button-container">
            <Button className = "receive-button" onClick={Received}>Package Received</Button>
            <Button className = "cancel-button" onClick={Delete}>Cancel Order</Button>
        </div> 
        <div className = {resultDisplayClass}>
          <h1>{message}</h1>
        </div>   
    </div>
  )
}

export default ResupplyManagement