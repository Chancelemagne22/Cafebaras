import React,{useEffect, useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../../designs/Transaction.css'
import { useNavigate } from 'react-router-dom';
        
        

function Transaction(){
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);
  const [fileName, setFileName] = useState('Transaction Data.csv');

  const [selectedWeek, setSelectWeek] = useState(null)
  const [displayWeek, setDisplayWeek] = useState(selectedWeek)
  
  const [transaction,setTransaction] = useState([])
  const [filteredByMonth, setFilteredByMonth] = useState([]);
  const [filteredByWeek, setFilteredByWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/');
        }
    }, []);
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
  const downloadCSV = (obj) =>{
    if (!Array.isArray(obj) || obj.length === 0) return;

    const headers = Object.keys(obj[0]).join(",");
  
    const rows = obj.map(objs => 
      Object.values(objs).map(value => (value === null ? "" : value)).join(",") // Handle null values
    ).join("\n");
    const csvContent = `${headers.toUpperCase()}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; 
    link.click(); 
    URL.revokeObjectURL(url);
  }
  useEffect(() => {
    let name = "Transaction Data.csv"; 
  
    if (selectedMonth !== null) {
      if (selectedWeek !== null) {
        name = `Transaction Data:${selectedMonth.name}:${selectedWeek.name}.csv`;
      } else {
        name = `Transaction Data:${selectedMonth.name}.csv`;
      }
    }
  
    setFileName(name); 
  }, [selectedMonth, selectedWeek]); 
  

  

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

      try{
        const response = await fetch('http://localhost:3001/api/transactions');
        
        const data = await response.json();

        setTransaction(data);
        setFilteredByMonth(data);
        setFilteredByWeek(data);
        setLoading(false);
      }catch(error){
        console.error('Error fetching transaction: ', error)
        setLoading(false)
      }
    }; 
    
    fetchTransaction();
  }, []);

  useEffect(()=>{
    if(selectedMonth){
      const filtered = transaction.filter((item) =>{
        const isMatch = item.month.toLowerCase() === selectedMonth.name.toLowerCase();
        return isMatch;
      })
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
          <Button label='Download CSV' onClick={()=> downloadCSV(filteredByWeek)} className='download-csv'/>
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