import { CustomTable } from '../../shared/CustomTable/CustomTable';
import { TitleWithTextCentered } from '../../shared/TitleWithText/TitleWithTextCentered';
import React, { useState, useEffect } from 'react';
import { httpGet } from "../../../services/HttpService";
import { Pie,Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LinearScale, CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';

ChartJS.register(ArcElement, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

export function Dashboard(){

    //Chart states
    const [pieChartData, setPieChartData] = useState({
      labels: [],
        datasets: [
          {
            label: '# of Votes',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ]
    });
    
    const [barChartData, setBarChartData] = useState({
      labels: [],
      datasets: [
          {
              label: 'Monthly Cost',
              data: [],
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50',
              borderWidth: 1,
          },
      ]
    });
    const barChartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
    };

    useEffect(() => {
        // Fetch customers when the component mounts
        httpGet('http://localhost:8002/reports/').then(response=>{

          //Update chart data
          setPieChartData({
            labels:  response.data.map(item => item.customer),
            datasets: [
              {
                label: 'Consumption',
                data: response.data.map(item => item.monthly_cost),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          })
            
          setBarChartData({
              labels: response.data.map(item => item.customer),
              datasets: [
                  {
                      label: 'Monthly Cost',
                      data: response.data.map(item => item.monthly_cost),
                      backgroundColor: '#4CAF50',
                      borderColor: '#4CAF50',
                      borderWidth: 1,
                  },
              ]
          })
        }).catch(error=>{
            console.log("Error fetching reports", error);
        })
    }, []);

    return(
        <>
        <div className='container products'>
            <TitleWithTextCentered title={"Dashboard"} text={"Verileri görüntüleyin."}></TitleWithTextCentered>
            <div className='row'>
                <div className='col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                  <Pie className='w-100' id='chart1' data={pieChartData}></Pie>
                </div>
                <div className='col-12 col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                  <Bar id='chart2' data={barChartData} options={barChartOptions}></Bar>
                </div>
            </div>
            
        </div>
        </>
    );
}