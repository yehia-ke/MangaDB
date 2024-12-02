// src/components/CustomerPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './customercss.module.css'; // Import the CSS module

function CustomerPage() {
    const navigate = useNavigate();
    // State variables
    const [servicePlans, setServicePlans] = useState([]);
    const [planConsumption, setPlanConsumption] = useState([]);
  

  // Input states
    const [planName, setPlanName] = useState('');
    const [start_date, setStart_Date] = useState('');
    const [end_date, setEnd_Date] = useState('');

  // Error and loading states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // Base API URL
  const apiUrl = 'https://localhost:7281/api/customer';

  // Load initial data
  useEffect(() => {
      fetchOfferedServicePlans();
      fetchTotalPlanConsumption();
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

  const fetchTotalPlanConsumption = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}gaafar/consumption`, {
            params: {
                plan_name: planName,
                start_date: start_date,
                end_date: end_date,
            },
        });
      setPlanConsumption(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch total plan consumption.');
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

      {/* Total Plan Consumption */}
      <section>
        <h2>Total Plan Consumption</h2>
        <form onSubmit={fetchTotalPlanConsumption} className={styles.form}>
          <div>
            <label>Plan name:</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={start_date}
              onChange={(e) => setStart_Date(e.target.value)}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              value={end_date}
              onChange={(e) => setEnd_Date(e.target.value)}
            />
          </div>
          <button type="submit">Fetch Plan Consumption</button>
        </form>
        {planConsumption.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Data Consumption</th>
                <th>Minutes Used</th>
                <th>SMS Sent</th>
              </tr>
            </thead>
            <tbody>
              {planConsumption.map((consumption, index) => (
                <tr key={index}>
                  <td>{consumption.data_consumption}</td>
                  <td>{consumption.minutes_used}</td>
                  <td>{consumption.SMS_sent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      </div>
  );

}

export default CustomerPage;

