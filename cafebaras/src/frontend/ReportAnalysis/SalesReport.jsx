import React, {useEffect,useState} from 'react'
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import supabase from './report';

const SalesReport = () => {

  
  const [totalSales, setTotalSales] = useState([]);
  const [chartSales, setChartSales] = useState(null);
  const [chartSalesOptions, setChartSalesOptions] = useState({});
  const [totalExpense, setTotalExpense] = useState();
  const [loading, setLoading] = useState(true);

  //const [selectedMonth, setSelectedMonth] = useState('January');
  const [filteredByMonth, setFilteredByMonth] = useState([]);

  const [selectedWeek, setSelectWeek] = useState(null);
  const [filteredByWeek, setFilteredByWeek] = useState([]);

  const [sales,setSales] = useState([]);

  const dateObj = new Date();
  const numOfMonth   = dateObj.getUTCMonth(); // months from 1-12

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
  const currentMonth = month[numOfMonth].name;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

const week = [
  {name: 'Week 1', code: 'W1'},
  {name: 'Week 2', code: 'W2'},
  {name: 'Week 3', code: 'W3'},
  {name: 'Week 4', code: 'W4'},
];
  const modifyMonth = (e) =>{
    setSelectedMonth(e.value.name)
    setSelectWeek(null)
    //setDisplayMonth(e.value.name)
  }
  const modifyWeek = (e) =>{
    setSelectWeek(e.value.code)
    //setDisplayWeek(e.value.name)

  }
  const resetDisplay = (e) =>{
    setSelectedMonth(null)
    setSelectWeek(null)
  }

useEffect(() => {
  const getTotalExpenses = async () => {
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
  };
  getTotalExpenses();
}, []);

useEffect(() => {
  const getTotalSales = async () => {
    setLoading(true); // Set loading state during fetch
    let query = supabase.from('transactions').select('*').eq('month', selectedMonth);

    if (selectedWeek) {
      // Add week filtering only if a week is selected
      query = query.eq('week', selectedWeek);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTotalSales(data || []); // Ensure data is set to an empty array if no results
      setSales(data.map(row => row.price));
    }
    setLoading(false);
  };

  getTotalSales();
  console.log(totalSales);
  console.log(sales)
  
}, [selectedMonth, selectedWeek]);

useEffect(() => {
  if (totalSales.length > 0) {
    const data = {
      labels: totalSales.map(row => row.productName),
      datasets: [
        {
          data: totalSales.map(row => row.payment),
          backgroundColor: ['#FCB025', '#C67529'],
          hoverBackgroundColor: ['#EB8509', '#EB8509'],
        }
      ]
    };
    const options = {
      plugins: {
        legend: {
          position: 'left',
          labels: {
            usePointStyle: true,
          }
        }
      }
    };

    setChartSales(data);
    setChartSalesOptions(options);
  }
  else {
    console.log("No data")
  }
}, [totalSales]);
  return (
    <div className='salesreport' >
      <div className='dateHolder'> Report date 
      <Dropdown value={selectedMonth} onChange={(e) => modifyMonth(e)} options={month} optionLabel="name" 
              editable placeholder="Select a Month" className="w-full md:w-14rem" />
      <Dropdown value={selectedWeek} onChange={(e) => modifyWeek(e)} options={week} optionLabel="name" 
              editable placeholder="Select a Week" className="w-full md:w-14rem" disabled={!selectedMonth} />
      <Button label='Reset' onClick={(e)=>resetDisplay(e)} className='reset'/>
      </div>
      <div className='mainReportTop'>
        <div className='SandE'>This is the Sales and Expenses</div>
        <div className='SandEGraph'>Graph for Sales and Expenses
        <div className="card">
                    <div className="pieContainer" 
                    style={{
                        // height: '30vh',
                        width: '30vw',
                        position: 'left',
                        // backgroundColor: 'red'

                    }}>
                        {chartSales &&(
                            <Chart
                                type="pie"
                                data={chartSales}
                                value={totalSales}
                                loading={loading}
                                options={chartSalesOptions}
                                className="piechart">
                            </Chart>
                        )}
                    </div>
                </div>
                </div>
        
      </div>
      <div className='mainReportBot'>
        <div className='PandF'>This is the Profit and Loss</div>
        <div className='PandFGraph'>Graph for Profit and Loss</div>
      </div>
    </div>
  )
}

export default SalesReport