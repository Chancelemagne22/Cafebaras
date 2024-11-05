import React, { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './supabaseAPI';

function SupplierManagement(){
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSuppliers = async () => {
        setLoading(true); // Set loading to true at the start of fetch
        let { data, error } = await supabase
          .from('suppliers')
          .select('*');
  
        if (error) {
          console.error("Error fetching suppliers:", error);
        } else {
          setSuppliers(data);
        }
        setLoading(false); // Set loading to false after fetch
      };
      
      fetchSuppliers();
    }, []); // Ensuring fetch runs only once
  
    console.log(suppliers);

    return(
        <div className="suppliermanagement">
          <div className='table'>
            <DataTable 
              className="suppliers-table" 
              value={suppliers} 
              loading={loading} 
              paginator 
              rows={5} 
              rowsPerPageOptions={[5, 10, 25, 50]} 
              autoLayout={true}
            >
              <Column className="datas" field="SupplierName" header="Supplier"/>
              <Column className="datas" field="ContactNumber" header="Contact Number"/>
              <Column className="datas" field="Email" header="Email"/>
              <Column className="datas" field='Address' header="Address"/>
            </DataTable>
          </div> 
            
          <div className = "button-container">
            <Button className = "add-supplier">+ Add Supplier</Button>
            <Button className = "remove-supplier" >- Remove Supplier</Button>
          </div>     
        </div>
    );
}

export default SupplierManagement