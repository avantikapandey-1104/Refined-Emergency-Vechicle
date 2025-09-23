import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Vitals = ({ vitals }) => {
  const data = {
    labels: vitals.ecg.map((_, index) => index),
    datasets: [
      {
        label: 'ECG',
        data: vitals.ecg,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patient Vitals',
      },
    },
  };

  return (
    <div className="vitals-container">
      <h2>Patient Vitals</h2>
      <div className="vitals-stats">
        <p>Oxygen: {vitals.oxygen}%</p>
        <p>Blood Pressure: {vitals.bp}</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Vitals;
