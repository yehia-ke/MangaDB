// src/components/CustomerPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './customercss.module.css'; // Import the CSS module
import { useSession } from "../../context/SessionContext";

function CustomerPage() {
    const { user } = useSession();
    var mobileNo = user.mobileNumber;
    const navigate = useNavigate();
    // State variables
    const [servicePlans, setServicePlans] = useState([]);
    const [planConsumption, setPlanConsumption] = useState([]);
    const [unsubscribedPlans, setUnsubscribedPlans] = useState([]);
    const [currentMonthPlanUsage, setCurrentMonthPlanUsage] = useState([]);
    const [cashbackTransactions, setCashbackTransactions] = useState([]);

    const [benefits, setBenefits] = useState([]);
    const [unresolvedTickets, setUnresolvedTickets] = useState([]);
    const setError = async(err) => {
      alert(err);
    };

  // Input states
    const [plan_name, setPlanName] = useState('');
    const [start_date, setStart_Date] = useState('');
    const [end_date, setEnd_Date] = useState('');
    const [nid, setNid] = useState('')

  // Error and loading states
  const [loading, setLoading] = useState(false);


  // Base API URL
  const apiUrl = 'https://localhost:7281/api/customer';

  // Load initial data
  useEffect(() => {
      fetchOfferedServicePlans();
      fetchTotalPlanConsumption();
      fetchUnsubscribedPlans();
      fetchCurrentMonthPlanUsages();
      fetchCashbackTransactions();
      fetchActiveBenefits();
      fetchUnresolvedTickets();
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

  const fetchActiveBenefits = async () => {  //benefit view
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}hassan/benefits`);
      setBenefits(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch active benefits.');
      setLoading(false);
    }
    };

    const fetchUnresolvedTickets = async (e) => {
    e.preventDefault();
    if (!nid) {
        setError('Please provide a National ID.');
        return;
    }
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}hassan/unresolved-tickets`, {
            params: { nid },
        });
      setUnresolvedTickets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch unresolved tickets.');
      setLoading(false);
    }
  };

  const fetchTotalPlanConsumption = async (e) => {
    e.preventDefault();
    if (!plan_name || !start_date || !end_date) {
        setError('Please provide a valid Plan ID and Date.');
        return;
    }
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}gaafar/consumption`, {
            params: { plan_name,start_date,end_date },
        });
      setPlanConsumption(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch total plan consumption.');
      setLoading(false);
    }
  };

  const fetchUnsubscribedPlans = async () => {
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}gaafar/unsubscribed-plans`, {
            params: { mobileNo },
        });
      setUnsubscribedPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch unsubscribed plans.');
      setLoading(false);
    }
  };

  const fetchCurrentMonthPlanUsages = async () => {
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}gaafar/current-month-plan-usages`, {
            params: { mobileNo },
        });
      setCurrentMonthPlanUsage(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch current month plan usage.');
      setLoading(false);
    }
  };

  const fetchCashbackTransactions = async () => {
    try {
      setLoading(true);
        const response = await axios.get(`${apiUrl}gaafar/cashback-transactions`, {
            params: { mobileNo },
        });
      setCashbackTransactions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cashback transactions.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      
      {loading && <p>Loading...</p>}

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

      {/* Unsubscribed plans */}
      <section>
        <h2>Unsubcribed Plans</h2>
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
                  {unsubscribedPlans.map((plan, index) => (
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

       {/* Current Month Plan Usage */}
      <section>
        <h2>Current Month Plan Usage</h2>
          <table>
              <thead>
                  <tr>
                      <th>Data Consumption</th>
                      <th>Minutes Used</th>
                      <th>SMS Sent</th>
                  </tr>
              </thead>
              <tbody>
                  {currentMonthPlanUsage.map((consumption, index) => (
                      <tr key={index}>
                          <td>{consumption.data_consumption}</td>
                          <td>{consumption.minutes_used}</td>
                          <td>{consumption.SMS_sent}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </section>

      {/* Cashback transactions */}
      <section>
        <h2>Cashback Transactions</h2>
          <table>
              <thead>
                  <tr>
                      <th>Cashback ID</th>
                      <th>Benefit ID</th>
                      <th>Wallet ID</th>
                      <th>Amount</th>
                      <th>Credit Date</th>
                  </tr>
              </thead>
              <tbody>
                  {cashbackTransactions.map((cashback, index) => (
                      <tr key={index}>
                          <td>{cashback.cashbackID}</td>
                          <td>{cashback.benefitID}</td>
                          <td>{cashback.walletID}</td>
                          <td>{cashback.amount}</td>
                          <td>{new Date(cashback.credit_date).toLocaleDateString()}</td>
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
              value={plan_name}
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

          {/* Active Benefits */}
          <section>
              <h2>Active Benefits</h2>
              <table>
                  <thead>
                      <tr>
                          <th>Benefit ID</th>
                          <th>Description</th>
                          <th>Validity_Date</th>
                          <th>Status</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      {benefits.map((benefit, index) => (
                          benefit.mobileNo === mobileNo ?( //checking that mobile no is equal to logged in no
                          <tr key={index}>
                              <td>{benefit.benefitID}</td>
                              <td>{benefit.description}</td>
                              <td>{benefit.validity_date}</td>
                              <td>{benefit.status}</td>             
                              </tr>)
                          : null                          //else display nothing
                      ))}
                  </tbody>
              </table>
          </section>


          {/* Unresolved Tickets */}
          <section>
              <h2>Amount of Unresolved Tickets</h2>
              <form onSubmit={fetchUnresolvedTickets} className={styles.form}>
                  <div>
                      <label>National ID:</label>
                      <input
                          type="text"
                          value={nid}
                          onChange={(e) => setNid(e.target.value)}
                      />
                  </div>
                  
                  <button type="submit">Fetch Amount of Unresolved Tickets</button>
              </form>
              {unresolvedTickets.length >= 0 && (
                  <table>
                      <thead>
                          <tr>
                              <th>mos zebi  a7a</th>
                          </tr>
                      </thead>
                      <tbody>
                          {unresolvedTickets.map((ticket, index) => (
                              <tr key={index}>
                                  <td>{ticket.count}</td>
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

