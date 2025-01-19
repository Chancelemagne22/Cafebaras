import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import supabase from './report';

const SalesReport = () => {
  const [chartSales, setChartSales] = useState(null);
  const [chartSalesOptions, setChartSalesOptions] = useState({});
  const [chartProfit,setChartProfit] = useState(null);
  const [chartProfitOptions, setChartProfitOptions] = useState({});
  const [totalProfit,setTotalProfit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(false);

  

  const [selectedWeek, setSelectedWeek] = useState(null);
  const [totalSales, setTotalSales] = useState(0);

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


  const dateObj = new Date();
  const numOfMonth   = dateObj.getUTCMonth(); // months from 1-12
  const currentMonth = month[numOfMonth].name;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const week = [
    { name: 'Week 1', code: 'W1' },
    { name: 'Week 2', code: 'W2' },
    { name: 'Week 3', code: 'W3' },
    { name: 'Week 4', code: 'W4' }
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.value.name);
    setSelectedWeek(null); // Reset week filter when changing month
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.value.code);
  };

  const resetFilters = () => {
    setSelectedMonth(currentMonth);
    setSelectedWeek(null);
  };

  useEffect(() => {
    const fetchSandEData = async () => {
      try {
        setLoading(true);
  
        // Fetch sales data
        let salesQuery = supabase
          .from('transactions')
          .select('*')
          .eq('month', selectedMonth);
  
        if (selectedWeek) {
          salesQuery = salesQuery.eq('week', selectedWeek);
        }
  
        const { data: salesData, error: salesError } = await salesQuery;
        if (salesError) throw salesError;
  
        const totalSalesAmount = (salesData || []).reduce((sum, row) => sum + row.price, 0);
  
        // Fetch expense data
        let expensesQuery = supabase
          .from('itemOverhead')
          .select('*')
          .eq('month', selectedMonth);
  
        if (selectedWeek) {
          expensesQuery = expensesQuery.eq('week', selectedWeek);
        }
  
        const { data: expensesData, error: expensesError } = await expensesQuery;
        if (expensesError) throw expensesError;
  
        const totalExpenseAmount = (expensesData || []).reduce((sum, item) => sum + item.price, 0);
  
        // Calculate profit
        const profit = totalSalesAmount - totalExpenseAmount;
  
        // Update all states at once
        setTotalSales(totalSalesAmount);
        setTotalExpense(totalExpenseAmount);
        setTotalProfit(profit);
      } catch (error) {
        console.error('Error fetching Sales and Expense data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSandEData();
  }, [selectedMonth, selectedWeek]);


  useEffect(() => {
    const SandE = [totalSales, totalExpense];

    if (SandE.length > 0) {
      const data = {
        labels: ['Sales', 'Expenses'],
        datasets: [
          {
            data: SandE,
            backgroundColor: ['#FCB025', '#C67529'],
            hoverBackgroundColor: ['#EB8509', '#EB8509']
          }
        ]
      };

      const options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'left',
            labels: {
              usePointStyle: true
            }
          }
        }
      };

      setChartSales(data);
      setChartSalesOptions(options);
    } else {
      console.log('No data');
    }
  }, [totalSales, totalExpense]);

  useEffect(() => {
    //const profit = totalSales - totalExpense;
    //setTotalProfit(profit);
    const PandL = [totalProfit,totalExpense];

    if (PandL.length > 0) {
      const data = {
        labels: ['Profit', 'Loss'],
        datasets: [
          {
            data: PandL,
            backgroundColor: ['#FCB025', '#C67529'],
            hoverBackgroundColor: ['#EB8509', '#EB8509']
          }
        ]
      };

      const options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'left',
            labels: {
              usePointStyle: true
            }
          }
        }
      };

      setChartProfit(data);
      setChartProfitOptions(options);
    } else {
      console.log('No data');
    }
  }, [totalExpense,totalProfit]);

  return (
    <div className='salesreport'>
      <div className='dateHolder'> Report date: 
      <Dropdown value={selectedMonth} onChange={handleMonthChange} options={month} optionLabel="name" 
              editable placeholder="Select a Month" className="w-full md:w-14rem" />
      <Dropdown value={selectedWeek} onChange={handleWeekChange} options={week} optionLabel="name" 
              editable placeholder="Select a Week" className="w-full md:w-14rem" disabled={!selectedMonth} />
      <Button label='Reset' onClick={resetFilters} className='reset'/>
      </div>
      <div className='mainReportTop'>
        <div className='SandE'>This is the Sales and Expenses
          <p>Total Sales: PHP {totalSales.toLocaleString()} </p>
            <p>Total Expenses: PHP {totalExpense.toLocaleString()} </p>
              </div>
        <div className='SandEGraph'>
        <div className="card">
                    <div className="pieContainer" 
                    style={{
                        //height: '30vh',
                        //width: '30vw',
                        position: 'left',
                        //backgroundColor: 'red'

                    }}>
                        {chartSales &&(
                            <Chart
                                type="pie"
                                data={chartSales}
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
        <div className='PandF'>This is the Profit and Loss
          <p>Total Profit: PHP {totalProfit.toLocaleString()} </p>
          <p>Total Loss: PHP {totalExpense.toLocaleString()} </p>
        </div>
        <div className='PandFGraph'>
        <div className="card">
                    <div className="pieContainer" 
                    style={{
                        //height: '30vh',
                        //width: '30vw',
                        position: 'left',
                        //backgroundColor: 'red'

                    }}>
                        {chartProfit &&(
                            <Chart
                                type="pie"
                                data={chartProfit}
                                loading={loading}
                                options={chartProfitOptions}
                                className="piechart">
                            </Chart>
                        )}
                    </div>
                </div>
        </div>
      </div>
    </div>
  )
}
export default SalesReport;