import React,{useState, useEffect} from 'react'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './inventory';

function SupplierManagement(){
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);

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
        
        <div className = "button-container">
            <Button className = "add-button">+ Add Supplier</Button>
            <Button className = "remove-button" >- Remove Supplier</Button>
        </div>    
    </div>
  )
}

export default SupplierManagement