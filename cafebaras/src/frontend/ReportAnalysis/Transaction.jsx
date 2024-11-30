import React,{useEffect, useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './report';
        
        

function Transaction(){
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);

  const [transaction,setTransaction] = useState([])
  const [loading, setLoading] = useState(true);


  const modifyMonth = (e) =>{
    setSelectedMonth(e.value)
    setDisplayMonth(e.value.name)
  }
    const month = [
        { name: 'January', code: 'JAN' },
        { name: 'February', code: 'FEB' },
        { name: 'March', code: 'MAR' },
        { name: 'April', code: 'APR' },
        { name: 'May', code: 'MAY' },
        { name: 'June', code: 'JUN' },
        { name: 'July', code: 'JUL' },
        { name: 'August', code: 'AUG' },
        { name: 'September', code: 'SEP' },
        { name: 'October', code: 'OCT' },
        { name: 'November', code: 'NOV' },
        { name: 'December', code: 'DEC' }
    ];
    
    
  useEffect(()=>{
    const fetchTransaction = async() => {
      setLoading(true);

      let {data, error} = await supabase
        .from('transactions')
        .select('*')

      if(error){
        console.error("Error fetching Transaction: ", error)
      }else{
        setTransaction(data);
      }
      setLoading(false)
    }
    fetchTransaction()
    console.log(transaction)
  }, []);

  return (
    <div className="transactionDisplay">
      <p>TRANSACTION</p>
      <div className="dropdowns">
        <div className="card flex justify-content-center">
          <Dropdown value={selectedMonth} onChange={(e) => modifyMonth(e)} options={month} optionLabel="name" 
              editable placeholder="Select a Month" className="w-full md:w-14rem" />
        </div>
      </div>
      <p>Report for the month of {displayMonth}</p>
      <div className="tableHolder">
        <DataTable value={transaction} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
          <Column className='transactData' field='tID' header='Transaction ID' />
          <Column className='transactData' field='date' header='Date'/>
          <Column className='transactData' field='productID' header='Product ID'/>
          <Column className='transactData' field='productName' header='Product Name'/>
          <Column className='transactData' field='price' header='Price'/>
        </DataTable>
      </div>
    </div>
  )
}

export default Transaction