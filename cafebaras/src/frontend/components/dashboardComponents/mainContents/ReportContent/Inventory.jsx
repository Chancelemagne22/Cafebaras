import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

function Inventory() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        '#FCB025',
                        '#C67529',
                        '#FFE3A8'
                    ],
                    hoverBackgroundColor: [
                        'white',
                        'white',
                        'white'
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
                        <div>Quarterly Sales</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="table">table</div>
            </div>
        </div>
    </>
    )
}

export default Inventory