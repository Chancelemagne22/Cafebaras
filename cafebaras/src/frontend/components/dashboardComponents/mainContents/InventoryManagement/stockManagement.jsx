import React, { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './supabaseAPI';

function StockManagement () {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchStocks = async () => {
        setLoading(true); // Set loading to true at the start of fetch
        let { data, error } = await supabase
          .from('stocksV3')
          .select('*');
  
        if (error) {
          console.error("Error fetching stocks:", error);
        } else {
          setStocks(data);
        }
        setLoading(false); // Set loading to false after fetch
      };
      
      fetchStocks();
    }, []); // Ensuring fetch runs only once
  
    console.log(stocks);

  return (
    <div className="stockmanagement">
      <div className='table'>
        <DataTable 
          className="stocks-table" 
          value={stocks} 
          loading={loading} 
          paginator 
          rows={5} 
          rowsPerPageOptions={[5, 10, 25, 50]} 
          autoLayout={true}
        >
          <Column className="datas" field="itemID" header="Item Code"/>
          <Column className="datas" field="Item_Name" header="Item Name"/>
          <Column className="datas" field="Stocked_Units" header="Stocked Units"/>
          <Column className="datas" field='Used_Units' header="Units Used"/>
          <Column className="datas" field='Units_Left' header="Units Left"/>
        </DataTable>
      </div>
      <div className = "footer-container">
        <div className = "footer-button">
          <Button className = "order-button">+ Order Stocks</Button>
        </div>
      </div> 
    </div>    
  )
}

export default StockManagement
