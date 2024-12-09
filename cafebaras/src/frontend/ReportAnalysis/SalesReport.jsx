import React, {useEffect,useState} from 'react'
import supabase from './report';

const SalesReport = () => {
  const [totalSales, setTotalSales] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [loading, setLoading] = useState(true);
  
  const getTotalSales = async ()=>{
    const { data, error } = await supabase
    .from('transactions')
    .select('*');
    
    if (error) {
    console.error("Error fetching Transactions:", error);
    } 
    else {
    setTotalSales(data);
    }
    setLoading(false); // Set loading to false after fetch
  }
  getTotalSales();
  console.log(totalSales);
  const getTotalExpenses=async()=>{
    const { data, error } = await supabase
    .from('itemOverhead')
    .select('*');
    
    if (error) {
    console.error("Error fetching itemOverhead:", error);
    } 
    else {
    setTotalExpense(data);
    }
    setLoading(false); // Set loading to false after fetch
  }
  getTotalExpenses();
  console.log(totalExpense);
  
  return (
    <div>
      <div className='salesreport'>Sales Report</div>
      <div className='bestproduct'>
        <div className='bestcoffee'>This is the best coffee</div>
        <div className='bestmilktea'>This is the best milktea</div>
        <div className='bestsinker'>This is the best sinkers</div>
      </div>
    </div>
  )
}

export default SalesReport