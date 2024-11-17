import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import supabase from './supabaseAPI';

function Inventory() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [stockedUnits, setStockedUnits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchStockedUnits = async () => {
        setLoading(true); // Set loading to true at the start of fetch
        let { data, error} = await supabase
          .from('stocks')
          .select('*');
  
        if (error) {
          console.error("Error fetching Stocked Units:", error);
        } else {
          setStockedUnits(data);
        }
        setLoading(false); // Set loading to false after fetch
      };

      fetchStockedUnits();
    }, []);

    console.log(stockedUnits);

    useEffect(() => {
        const data = {
            labels: stockedUnits.map(row => row.Item_Name),
            datasets: [
                {
                    data: stockedUnits.map(row => row.Stocked_Units),
                    backgroundColor: [
                        '#FCB025',
                        '#C67529',
                        '#FFE3A8'
                    ],
                    hoverBackgroundColor: [
                        '#EB8509',
                        '#EB8509',
                        '#EB8509'
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <>
        <div id = "invText">Report for date period:</div>
        <div className="inventory_container">
            <div className="numbers"></div>
            <div className="graphs">
                <div className="card">
                    <div className="pieContainer">
                        <Chart type="pie" data={chartData} options={chartOptions} className="piechart" />
                        <div className='Q_S_text'>Quarterly Sales</div>
                    </div>
                </div>
            </div>
                <div className="tables">
                    <DataTable 
                        className="stocks-table" 
                        value={stockedUnits} 
                        loading={loading} 
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        autoLayout={true}
                    >
                        <Column className="datas" field="itemID" header="Item Code"/>
                        <Column className="datas" field="Item_Name" header="Item Name"/>
                        <Column className="datas" field="Stocked_Units" header="Stocked Units"/>


                    </DataTable>
                </div>
        </div>
    </>
    )
}

export default Inventory;