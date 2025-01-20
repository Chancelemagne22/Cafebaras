import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function SupplierManagement(){
  const [orderClassName, setClassName] = useState('Order hide');
  const [change, setChange] = useState(true);
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [resultDisplay, setResultDisplay] = useState(false); 
  const [message,setMessage] = useState("");
  const resultDisplayClass = resultDisplay ? 'resultDisplay show' : 'resultDisplay';

  const [supplierName, setSupplierName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const togglePopup = async (e) => {
    if(change){
        setClassName('Order show') 
        setChange(false)
    }else{
        setClassName('Order hide')
        setChange(true)
    }
  }

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from('suppliers')
        .select('*');

      if (error) {
        console.error("Error fetching suppliers:", error);
      } else {
        setSupplier(data);
      }
      setLoading(false);
    };
    
    fetchSupplier();
  }, []);
  const addItem = async () => {
    try {
      const { error } = await supabase
        .from('suppliers')
        .insert([
          {
            SupplierName: supplierName,
            ContactNumber: parseInt(contact),
            Email: email,
            Address: address
          }
        ]);
  
      if (error) {
        console.error("Error inserting item:", error);
      } else {
        togglePopup()
        console.log("Item added successfully!");
        setMessage("Item added successfully");
        showResultDisplay();
        resetForm();
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const itemDelete = async () => {
    if (selectedSupplier != null) {
      const info = Object.values(selectedSupplier);
      const suppID = info[0];
      setMessage("Selected item is deleted");
      showResultDisplay();
      try {
          const { error } = await supabase
            .from('suppliers')
            .delete()
            .eq('supplierID', suppID);
        
        
          console.log("A data has been deleted");
          // Update the resupply state by removing the deleted item
          setSupplier((prevSupplier) => prevSupplier.filter((item) => item.supplierID !== suppID));
          setSelectedProduct(null); // Clear the selection
         
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
    setSupplierName("");
    setContact("");
    setEmail("");
    setAddress("");
  };
  const showResultDisplay = ()=>{
    setResultDisplay(true);
    console.log("Show Order Display state set to true");
  }
  useEffect(() => {
    if (resultDisplay) {
        const timer = setTimeout(() => {
            setResultDisplay(false);
            console.log("Order display hidden after 20 seconds");
        }, 5000);
        return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [resultDisplay]);
  return (
    <div className="suppliermanagement">
        <div className="table-container">
            <div className="tablebg">    
                <div className='table'>
                    <DataTable 
                        className="supplier-table" 
                        value={supplier} 
                        loading={loading} 
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        selectionMode="single"
                        selection={selectedSupplier}
                        onSelectionChange={(e) => setSelectedSupplier(e.value)}
                        dataKey="supplierID"
                        metakey="true"
                        autoLayout={true}
                    >
                        <Column className="datas" field="supplierID" header="Supplier ID" />
                        <Column className="datas" field="SupplierName" header="Supplier Name"/>
                        <Column className="datas" field="ContactNumber" header="Contact Number"/>
                        <Column className="datas" field='Email' header="Email"/>
                        <Column className="datas" field='Address' header="Address"/>
                    </DataTable>
                </div> 
            </div>
        </div>
        <div className={orderClassName} id="ResupplyPop">
        <div className="orderContent">
        <h1>Add Supplier Information: </h1>
        <div>
                <label>Supplier Name:</label>
                <input 
                  type="text" 
                  value={supplierName} 
                  onChange={(e) => setSupplierName(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Contact Number:</label>
                <input 
                  type="text" 
                  value={contact} 
                  onChange={(e) => setContact(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Email Address:</label>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="off" 
                />
              </div>
              <div>
                <label>Current Address:</label>
                <input 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  autoComplete="off" 
                />
              </div>

          </div>
          <div className="buttons">
          <button className='add_supplier' onClick={addItem}> Add Supplier Info</button>
          <button className="close_btn" onClick={togglePopup}>
            <span className="close">&times;</span>
          </button>
          </div>
          </div>
        
        <div className = "button-container">
            <Button className = "add-button" onClick={togglePopup}>+ Add Supplier</Button>
            <Button className = "remove-button" onClick={itemDelete}>- Remove Supplier</Button>
        </div>    
        <div className = {resultDisplayClass}>
          <h1>{message}</h1>
        </div> 
    </div>
  )
}

export default SupplierManagement