// src/components/CustomerPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './customercss.module.css'; // Import the CSS module

function CustomerPage() {
    const navigate = useNavigate();
    // State variables
  const [servicePlans, setServicePlans] = useState([]);
  

  // Input states
 
  

  // Error and loading states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // Base API URL
  const apiUrl = 'https://localhost:7281/api/customer';

  // Load initial data
  useEffect(() => {
      fetchOfferedServicePlans();
  }, []);

  const fetchOfferedServicePlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}gaafar/service-plans`);
      setServicePlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch offered service plans.');
      setLoading(false);
    }
  };

  


  return (
    <div>
      <h1>Customer Dashboard</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Service Plans */}
      <section>
        <h2>Service Plans</h2>
        <table>
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>SMS Offered</th>
              <th>Minutes Offered</th>
              <th>Data Offered</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {servicePlans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planID}</td>
                <td>{plan.name}</td>
                <td>{plan.price}</td>
                <td>{plan.SMS_offered}</td>
                <td>{plan.minutes_offered}</td>
                <td>{plan.data_offered}</td>
                <td>{plan.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </div>
  );

}

export default CustomerPage;

