import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './supabaseAPI';

function TransactionHistory () {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true); // Set loading to true at the start of fetch
      let { data, error } = await supabase
        .from('transactions')
        .select('*');

      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        setTransactions(data);
      }
      setLoading(false); // Set loading to false after fetch
    };
    
    fetchTransaction();
  }, []); // Ensuring fetch runs only once

  console.log(transactions);

  return (
    <>
      <div className="salesContainer">
        <div className="dropdowns">
          <div className="month"><p>Month</p></div>
          <div className="year"><p>Year</p></div>
        </div>
        <div className="date"><p>Report for Date Period: January xx - February xx</p></div>
        <div className="label"><p>Profit Report</p></div>
        <div className="visualReport table">
          {/* <DataTable className="dtb" value={transactions} loading={loading}  scrollable scrollHeight="400px" >
            <Column className="datas" field="itemID" header="ID" headerStyle={{backgroundColor:'#fff'}} />
            <Column className="datas" field="ItemCategory" header="Item" headerStyle={{backgroundColor:'#fff'}} />
            <Column className="datas" field="ItemName" header="Name" headerStyle={{backgroundColor:'#fff'}} />
            <Column className="datas" field='Unit' header="Unit" headerStyle={{backgroundColor:'#fff'}}/>
            <Column className="datas" field='Unit Cost' header="Unit Cost" headerStyle={{backgroundColor:'#fff'}}/>
            <Column className="datas" field='Supplier_ID' header="Supplier ID" headerStyle={{backgroundColor:'#fff'}}/>
          </DataTable> */}
        </div>
      </div>
    </>
  );
}

export default TransactionHistory;
