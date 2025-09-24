import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Vitals = ({ vitals, networkStable }) => {
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

  const isCritical = vitals.oxygen < 85 || parseInt(vitals.bp.split('/')[0]) < 90;
  const isLow = vitals.oxygen < 90 || parseInt(vitals.bp.split('/')[0]) < 100;

  return (
    <div className="vitals-container">
      <h2>Patient Vitals</h2>
      {!networkStable && (
        <div className="network-warning">
          <p>Network unstable-Click "Call QoD API" to restore connection.</p>
        </div>
      )}
      <div className="vitals-stats">
        <p className={vitals.oxygen < 85 ? 'critical' : vitals.oxygen < 90 ? 'low' : ''}>Oxygen: {vitals.oxygen}%</p>
        <p className={parseInt(vitals.bp.split('/')[0]) < 90 ? 'critical' : parseInt(vitals.bp.split('/')[0]) < 100 ? 'low' : ''}>Blood Pressure: {vitals.bp}</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Vitals;
