"use client"
import React, { useRef, useState, useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [items, setItems] = useState([
    {finance: {
      periods: [
        {graph: {
          year: {},
          half_year: {},
          month: {}
        }}]
  }}]);
  const [selectedOption, setSelectedOption] = useState('За последний год');
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string,
      borderRadius: number,
      barThickness: number
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: true,
        position: 'average',
        backgroundColor: '#65FF8E',
        callbacks: {
          title: () => '',
          label: function (context:any) {
            return context.parsed.y.toString();
          }
        },
        displayColors: false,
        bodyFont: {
          family: 'Manrope',
          size: 16,
          lineHeight: 1.5,
        },
        bodyColor: '#000',
        padding: {
          left: 8,
          right: 8
      }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000',
          font: {
            size: 20,
            family: 'Manrope',
          },
          maxRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000',
          font: {
            size: 20,
            family: 'Manrope',
          },
        },
      },
    },
  }


  React.useEffect(()=> {
    axios.get('https://6524dab7ea560a22a4ea2cbf.mockapi.io/tesk-task').then(res => setItems(res.data))
  },[])

 const year = items[0].finance.periods[0].graph.year;
 const halfyear = items[0].finance.periods[0].graph.half_year;
 const month = items[0].finance.periods[0].graph.month;


 useEffect(() => {
  switch (selectedOption) {
    case 'За последний год':
      setChartData({
        labels: Object.keys(year),
        datasets: [
          {
            label: selectedOption,
            data: Object.values(year).map((value) => Number(value)),
            backgroundColor: '#000AFF',
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      });
      break;
    case 'За последние полгода':
      setChartData({
        labels: Object.keys(halfyear),
        datasets: [
          {
            label: selectedOption,
            data: Object.values(halfyear).map((value) => Number(value)),
            backgroundColor: '#000AFF',
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      });
      break;
    case 'За последний месяц':
      setChartData({
        labels:  ['01',' ',' ', ' ', '05', ' ', ' ',  ' ', '', '10', '',' ',' ', ' ', '15', ' ', ' ',  ' ', ' ', '20', '', '', '', ' ', '25', ' ', ' ',  ' ', '', '30', ''],
        datasets: [
          {
            label: selectedOption,
            data: Object.values(month).map((value) => Number(value)),
            backgroundColor: '#000AFF',
            borderRadius: 4,
            barThickness: 16,
          },
        ],
      });
      break;
     
    default:
      setChartData({
        labels: [],
        datasets: [],
      });
      break;
  }
}, [selectedOption, year, halfyear, month]);


  return (
  <div className='wrapper'>
    <div className='select-wrapper'>
       <select
        name='date'
        ref={selectRef}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="За последний год">За последний год</option>
        <option value="За последние полгода">За последние полгода</option>
        <option value="За последний месяц">За последний месяц</option>
      </select>
      </div>
      {Object.values(year)?.length > 0 && <Bar
       //@ts-ignore
       options={options} 
       data={chartData}/>} 
      </div>
  )
}
