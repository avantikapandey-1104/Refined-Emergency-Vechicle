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
  const [highPriority, setHighPriority] = useState(false);

  useEffect(() => {
    // Simulate vitals streaming
    const interval = setInterval(() => {
      if (networkStable) {
        // When network is stable, vitals improve and stabilize
        setVitals(prev => {
          const lastEcg = prev.ecg.length > 0 ? prev.ecg[prev.ecg.length - 1] : 75;
          const newEcg = Math.min(150, lastEcg + (Math.random() > 0.5 ? 5 : -2)); // Gradual improvement with slight fluctuation
          const newOxygen = Math.min(100, prev.oxygen + (Math.random() > 0.3 ? 3 : -1)); // Gradual improvement
          const bpSystolic = parseInt(prev.bp.split('/')[0]);
          const bpDiastolic = parseInt(prev.bp.split('/')[1]);
          const newBpSystolic = Math.min(140, bpSystolic + (Math.random() > 0.4 ? 4 : -1));
          const newBpDiastolic = Math.min(90, bpDiastolic + (Math.random() > 0.4 ? 3 : -1));

          return {
            ...prev,
            ecg: [...prev.ecg.slice(-19), newEcg],
            oxygen: newOxygen,
            bp: `${newBpSystolic}/${newBpDiastolic}`
          };
        });
      } else {
        // When network is unstable, vitals deteriorate consistently
        setVitals(prev => {
          const lastEcg = prev.ecg.length > 0 ? prev.ecg[prev.ecg.length - 1] : 75;
          const newEcg = Math.max(30, lastEcg - (Math.random() > 0.3 ? 8 : 3)); // Consistent downward trend
          const newOxygen = Math.max(60, prev.oxygen - (Math.random() > 0.4 ? 6 : 2)); // Consistent drop
          const bpSystolic = parseInt(prev.bp.split('/')[0]);
          const bpDiastolic = parseInt(prev.bp.split('/')[1]);
          const newBpSystolic = Math.max(70, bpSystolic - (Math.random() > 0.3 ? 7 : 2));
          const newBpDiastolic = Math.max(40, bpDiastolic - (Math.random() > 0.3 ? 5 : 2));

          return {
            ...prev,
            ecg: [...prev.ecg.slice(-19), newEcg],
            oxygen: newOxygen,
            bp: `${newBpSystolic}/${newBpDiastolic}`
          };
        });
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
    setAlert('Network issue simulated: Vitals deteriorating. Ambulance requesting high priority connectivity. Click "Call QoD API" to restore connection.');
  };

  const callQodApi = async () => {
    setAlert('Calling QoD API... Requesting high network priority for ambulance.');
    try {
      // Call QoD API to get high network priority for ambulance
      const response = await axios.post('http://localhost:8000/api/qod-stabilize/');
      console.log('QoD API response:', response.data);
      setNetworkStable(true);
      setHighPriority(true);

      // Reset vitals to good values when network stabilizes
      setVitals(prev => ({
        ...prev,
        oxygen: 95,
        bp: '120/80',
        ecg: [...prev.ecg.slice(-5), 75, 80, 85, 90, 95] // Reset ECG to improving trend
      }));

      setAlert('QoD API activated: Ambulance granted high network priority. Vitals stabilizing...');
      // Simulate hospital alert after stabilization
      setTimeout(() => {
        setAlert('Incoming Ambulance: Patient needs cardiac care, ETA 5 min - High priority transmission active');
      }, 2000);
    } catch (error) {
      console.error('QoD API error:', error);
      setAlert('Error calling QoD API. Please check if the backend server is running.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Emergency Vehicle Dashboard</h1>
      {highPriority && (
        <div className="high-priority-indicator">
          <span className="high-priority-text">HIGH PRIORITY</span>
          <p>Ambulance has high network priority - Guaranteed connectivity</p>
        </div>
      )}
      <Map location={location} />
      <Vitals vitals={vitals} networkStable={networkStable} />
      <HospitalAlert alert={alert} />
      <div className="controls">
        <button onClick={simulateNetworkIssue}>Simulate Network Issue</button>
        <button onClick={callQodApi}>Call QoD API</button>
      </div>
    </div>
  );
};

export default Dashboard;
