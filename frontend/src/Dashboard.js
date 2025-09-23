import React, { useState, useEffect } from 'react';
import Map from './Map';
import Vitals from './Vitals';
import HospitalAlert from './HospitalAlert';
import axios from 'axios';

const Dashboard = () => {
  const [vitals, setVitals] = useState({ ecg: [], oxygen: 95, bp: '120/80' });
  const [location, setLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [networkStable, setNetworkStable] = useState(true);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // Simulate vitals streaming
    const interval = setInterval(() => {
      if (networkStable) {
        setVitals(prev => ({
          ...prev,
          ecg: [...prev.ecg.slice(-19), Math.random() * 100 + 50], // Simulate ECG data
        }));
      }
    }, 1000);

    // Simulate location updates
    const locationInterval = setInterval(() => {
      setLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01,
        lng: prev.lng + (Math.random() - 0.5) * 0.01,
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(locationInterval);
    };
  }, [networkStable]);

  const simulateNetworkIssue = () => {
    setNetworkStable(false);
    setAlert('Network issue simulated: Vitals frozen.');
  };

  const callQodApi = async () => {
    try {
      // Mock QoD API call
      await axios.post('http://localhost:8000/api/qod-stabilize/');
      setNetworkStable(true);
      setAlert('QoD API called: Connection stabilized.');
      // Simulate hospital alert after stabilization
      setTimeout(() => {
        setAlert('Incoming Ambulance: Patient needs cardiac care, ETA 5 min');
      }, 2000);
    } catch (error) {
      console.error('QoD API error:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Emergency Vehicle Dashboard</h1>
      <Map location={location} />
      <Vitals vitals={vitals} />
      <HospitalAlert alert={alert} />
      <div className="controls">
        <button onClick={simulateNetworkIssue}>Simulate Network Issue</button>
        <button onClick={callQodApi}>Call QoD API</button>
      </div>
    </div>
  );
};

export default Dashboard;
