import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './supabaseAPI';

function TransactionHistory () {
  const [transactions, setTransactions] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () =>{
      let {data, error} = await supabase
        .from('transaction')
        .select('*');


      if(error){
        console.error("Error fetching transactions:", error);
      }else{
        setTransactions(data);
      }
      isLoading(false);
      
    };
    fetchTransaction();

  },[]);



  return (
    <>
      <div className="salesContainer">
            <div className="dropdowns">
                <div className="month"><p>Month</p></div>
                <div className="year"><p>Year</p></div>
            </div>
            <div className="date"><p>Report for Date Period: January xx - February xx</p></div>
            <div className="label"><p>Profit Report</p></div>
            <div className="visualReport">
              <DataTable value={transactions} loading={loading} tableStyle={{ minWidth: '20rem' }}>
                <Column field="Date" header="Date" />
                <Column field="Product_ID" header="Product ID" />
                <Column field="CustomerName" header="Customer Name" />
                <Column field="Price" header="Price" />
                <Column field="Total" header="Total" />
                <Column field="Payment Method" header="Payment Method" />
                <Column field="Payment" header="Payment" />
                <Column field="Change" header="Change" />

                
              </DataTable>
            </div>
      </div>
    </>
  )
}

export default TransactionHistory