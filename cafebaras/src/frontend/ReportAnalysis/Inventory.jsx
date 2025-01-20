import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { use } from 'react';


function Inventory () {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});
    const [stockedUnits, setStockedUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log('Check')

    
    useEffect(() => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
          navigate('/');
      }
    }, []);
  

    useEffect(() => {
        let isMounted = true;

        const fetchStockedUnits = async () => {
            if(!isMounted) return;
            setLoading(true); // Set loading to true at the start of fetch\
            try{
                const response = await fetch('http://localhost:3001/api/inventory')
                const data = await response.json()

                setStockedUnits(data)

            }catch(error){
                console.error('Error fetching inventory: ', error)
            }finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
            
            setLoading(false); // Set loading to false after fetch
          };
    
          fetchStockedUnits();  
          return () => {
            isMounted = false; // Cleanup: prevent state updates if the component unmounts
        };
        }, []);
    
    useEffect(() => {
        if(stockedUnits.length > 0){

            const data = {
                labels: stockedUnits.map(row => row.ItemName),
                datasets: [
                    {
                        data: stockedUnits.map(row => row.Stocked_Units),
                        backgroundColor: [
                            '#FCB025',
                            '#C67529',
                            '#4E2603'
                        ],
                        hoverBackgroundColor: [
                            '#EB8509',
                            '#EB8509',
                            '#EB8509'
                        ],
                    
                    }
                ]
            }
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

            setChartData(data);
            setChartOptions(options);
        }

    },[stockedUnits]);
    
    return (
        <div>Inventory Report
            <div style = {{display: 'flex'}}>
            <div className="card">
                    <div className="pieContainer" 
                    style={{
                        // height: '30vh',
                        width: '30vw',
                        position: 'left',
                        // backgroundColor: 'red'

                    }}>
                        {chartData &&(
                            <Chart
                                type="pie"
                                data={chartData}
                                value={stockedUnits}
                                loading={loading}
                                options={chartOptions}
                                className="piechart">
                            </Chart>
                        )}
                    </div>
                </div>
            <div className="tables" style={{padding: '30px'}}>
                    <DataTable 
                        className="stocks-table" 
                        value={stockedUnits} 
                        loading={loading}
                        paginator 
                        rows={10} 
                    >
                        <Column className="datas" field="itemID" header="Item Code"/>
                        <Column className="datas" field="ItemName" header="Item Name"/>
                        <Column className="datas" field="Stocked_Units" header="Stocked Units"/>


                    </DataTable>
                    
                </div>
                </div>
        </div>
      )
}

export default Inventory