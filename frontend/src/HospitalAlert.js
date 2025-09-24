import React from 'react';

const HospitalAlert = ({ alert }) => {
  return (
    <div className="hospital-alert">
      <h2>Hospital Pre-Alert</h2>
      {alert ? <p>{alert}</p> : <p>No alerts at this time.</p>}
    </div>
  );
};

export default HospitalAlert;
