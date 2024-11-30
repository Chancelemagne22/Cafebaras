import React,{useEffect, useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import supabase from './report';
import '../../designs/Transaction.css'
        
        

function Transaction(){
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);

  const [selectedWeek, setSelectWeek] = useState(null)
  const [displayWeek, setDisplayWeek] = useState(selectedWeek)
  



  const [transaction,setTransaction] = useState([])
  const [filteredByMonth, setFilteredByMonth] = useState([]);
  const [filteredByWeek, setFilteredByWeek] = useState([]);
  const [loading, setLoading] = useState(true);


  const modifyMonth = (e) =>{
    setSelectedMonth(e.value)
    setSelectWeek(null)
    setDisplayMonth(e.value.name)
  }
  const modifyWeek = (e) =>{
    setSelectWeek(e.value)
    setDisplayWeek(e.value.name)
  }
  const resetDisplay = (e) =>{
    setSelectedMonth(null)
    setSelectWeek(null)
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

  const week = [
    {name: 'Week 1', code: 'W1'},
    {name: 'Week 2', code: 'W2'},
    {name: 'Week 3', code: 'W3'},
    {name: 'Week 4', code: 'W4'},
  ]

    
  useEffect(()=>{
    const fetchTransaction = async() => {
      setLoading(true);

      let {data, error} = await supabase
        .from('transactions')
        .select('*')
        .order('tID',{ascending:false})

      if(error){
        console.error("Error fetching Transaction: ", error)
      }else{
        setTransaction(data);
        setFilteredByMonth(data);
        setFilteredByWeek(data);
      }
      // setLoading(false)
    }
    fetchTransaction()

  }, []);

  useEffect(()=>{
    if(selectedMonth){
      console.log(selectedMonth.name)
      const filtered = transaction.filter((item) =>{
        const isMatch = item.month.toLowerCase() === selectedMonth.name.toLowerCase();
        console.log(item.month.toLowerCase() + " check")
        console.log(selectedMonth.name.toLowerCase() + " confirm")
        return isMatch;
      })
      console.log(filtered)
      setFilteredByMonth(filtered)
      setFilteredByWeek(filtered);
    }else{
      setFilteredByMonth(transaction);
      setFilteredByWeek(transaction);
    }
  }, [selectedMonth,transaction])

  useEffect(() => {
    if (selectedWeek) {
      const filtered = filteredByMonth.filter((item) =>
        item.week.toLowerCase() === selectedWeek.code.toLowerCase()
      );
      setFilteredByWeek(filtered);
    } else {
      setFilteredByWeek(filteredByMonth); 
    }
  }, [selectedWeek, filteredByMonth]);

  
  

  
  return (
    <div className="transactionDisplay">
      <p>TRANSACTION</p>
      <div className="dropdowns">
        <div className="card flex justify-content-center">
          <Dropdown value={selectedMonth} onChange={(e) => modifyMonth(e)} options={month} optionLabel="name" 
              editable placeholder="Select a Month" className="w-full md:w-14rem" />
          <Dropdown value={selectedWeek} onChange={(e) => modifyWeek(e)} options={week} optionLabel="name" 
              editable placeholder="Select a Week" className="w-full md:w-14rem" disabled={!selectedMonth} />
            <Button label='Reset' onClick={(e)=>resetDisplay(e)} className='reset'/>
        </div>
        
      </div>
      <p>Report for the month of {displayMonth}</p>
      <div className="tableHolder">
        <DataTable value={filteredByWeek} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
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