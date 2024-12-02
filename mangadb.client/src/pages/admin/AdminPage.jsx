// src/components/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './admincss.module.css'; // Import the CSS module

function AdminPage() {
    const navigate = useNavigate();
    // State variables
  const [customerProfiles, setCustomerProfiles] = useState([]);
  const [physicalStores, setPhysicalStores] = useState([]);
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [accountsWithPlans, setAccountsWithPlans] = useState([]);
  const [accountsSubscribed, setAccountsSubscribed] = useState([]);
  const [totalUsage, setTotalUsage] = useState([]);
  const [smsOffers, setSmsOffers] = useState([]);

  // Input states
  const [planId, setPlanId] = useState('');
  const [date, setDate] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [smsMobileNo, setSmsMobileNo] = useState(''); // For SMS Offers
  const [removeMobileNo, setRemoveMobileNo] = useState(''); // For Remove Benefits
  const [removePlanId, setRemovePlanId] = useState(''); // For Remove Benefits

  // Error and loading states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Message state for remove benefits success message
  const [removeBenefitsMessage, setRemoveBenefitsMessage] = useState('');

  // Base API URL
  const apiUrl = 'https://localhost:7281/api/admin';

  // Load initial data
  useEffect(() => {
    // Fetch customer profiles
    fetchCustomerProfiles();

    // Fetch physical stores with vouchers
    fetchPhysicalStores();

    // Fetch resolved tickets
    fetchResolvedTickets();

    // Fetch accounts with plans
    fetchAccountsWithPlans();
  }, []);

  const fetchCustomerProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/customer-profiles`);
      setCustomerProfiles(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch customer profiles.');
      setLoading(false);
    }
  };

  const fetchPhysicalStores = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/physical-stores/vouchers`);
      setPhysicalStores(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch physical stores.');
      setLoading(false);
    }
  };

  const fetchResolvedTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/resolved-tickets`);
      setResolvedTickets(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch resolved tickets.');
      setLoading(false);
    }
  };

  const fetchAccountsWithPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/accounts/plans`);
      setAccountsWithPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch accounts with plans.');
      setLoading(false);
    }
  };

  const fetchAccountsSubscribed = async (e) => {
    e.preventDefault();
    if (!planId || !date) {
      setError('Please provide a valid Plan ID and Date.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/accounts/subscribed`, {
        params: { planId, date },
      });
      setAccountsSubscribed(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch accounts subscribed to plan.');
      setLoading(false);
    }
  };

  const fetchTotalUsage = async (e) => {
    e.preventDefault();
    if (!mobileNo || !startDate) {
      setError('Please provide a valid Mobile Number and Start Date.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/accounts/usage`, {
        params: { mobileNo, startDate },
      });
      setTotalUsage(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch total usage.');
      setLoading(false);
    }
  };

  const fetchSmsOffers = async (e) => {
    e.preventDefault();
    if (!smsMobileNo) {
      setError('Please provide a valid Mobile Number.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/accounts/sms-offers`, {
        params: { mobileNo: smsMobileNo },
      });
      setSmsOffers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch SMS offers.');
      setLoading(false);
    }
  };

  const removeBenefits = async (e) => {
    e.preventDefault();
    if (!removeMobileNo || !removePlanId) {
      setError('Please provide a valid Mobile Number and Plan ID.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/benefits/remove`, {
        mobileNo: removeMobileNo,
        planId: parseInt(removePlanId),
      });
      setRemoveBenefitsMessage('Benefits removed successfully.');
      setLoading(false);
    } catch (err) {
      setError('Failed to remove benefits.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button
                className={styles.blackButton}
                onClick={() => navigate('/admin2')} // Add navigation on button click
            >
                Go to Another Page
            </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Customer Profiles */}
      <section>
        <h2>Customer Profiles</h2>
        <table>
          <thead>
            <tr>
              <th>National ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile No</th>
              <th>Account Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customerProfiles.map((profile, index) => (
              <tr key={index}>
                <td>{profile.nationalID}</td>
                <td>{profile.first_name}</td>
                <td>{profile.last_name}</td>
                <td>{profile.mobileNo}</td>
                <td>{profile.account_type}</td>
                <td>{profile.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Physical Stores */}
      <section>
        <h2>Physical Stores with Vouchers</h2>
        <table>
          <thead>
            <tr>
              <th>Shop ID</th>
              <th>Address</th>
              <th>Working Hours</th>
              <th>Voucher ID</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {physicalStores.map((store, index) => (
              <tr key={index}>
                <td>{store.shopID}</td>
                <td>{store.address}</td>
                <td>{store.working_hours}</td>
                <td>{store.voucherID}</td>
                <td>{store.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Resolved Tickets */}
      <section>
        <h2>Resolved Tickets</h2>
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Mobile No</th>
              <th>Issue Description</th>
              <th>Priority Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {resolvedTickets.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.ticketID}</td>
                <td>{ticket.mobileNo}</td>
                <td>{ticket.issue_description}</td>
                <td>{ticket.priority_level}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Accounts with Plans */}
      <section>
        <h2>Accounts with Subscribed Plans</h2>
        <table>
          <thead>
            <tr>
              <th>Mobile No</th>
              <th>Plan ID</th>
              <th>Plan Name</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {accountsWithPlans.map((account, index) => (
              <tr key={index}>
                <td>{account.mobileNo}</td>
                <td>{account.planID}</td>
                <td>{account.name}</td>
                <td>{account.balance}</td>
                <td>{account.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Accounts Subscribed to Plan */}
      <section>
        <h2>Accounts Subscribed to Plan</h2>
        <form onSubmit={fetchAccountsSubscribed} className={styles.form}>
          <div>
            <label>Plan ID:</label>
            <input
              type="number"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit">Fetch Accounts</button>
        </form>
        {accountsSubscribed.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Mobile No</th>
                <th>Plan ID</th>
                <th>Plan Name</th>
              </tr>
            </thead>
            <tbody>
              {accountsSubscribed.map((account, index) => (
                <tr key={index}>
                  <td>{account.mobileNo}</td>
                  <td>{account.planID}</td>
                  <td>{account.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Total Usage */}
      <section>
        <h2>Total Usage</h2>
        <form onSubmit={fetchTotalUsage} className={styles.form}>
          <div>
            <label>Mobile No:</label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <button type="submit">Fetch Usage</button>
        </form>
        {totalUsage.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Plan ID</th>
                <th>Total Data</th>
                <th>Total Minutes</th>
                <th>Total SMS</th>
              </tr>
            </thead>
            <tbody>
              {totalUsage.map((usage, index) => (
                <tr key={index}>
                  <td>{usage.planID}</td>
                  <td>{usage['total data']}</td>
                  <td>{usage['total mins']}</td>
                  <td>{usage['total SMS']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Remove Benefits */}
      <section>
        <h2>Remove Benefits</h2>
        <form onSubmit={removeBenefits} className={styles.form}>
          <div>
            <label>Mobile No:</label>
            <input
              type="text"
              value={removeMobileNo}
              onChange={(e) => setRemoveMobileNo(e.target.value)}
            />
          </div>
          <div>
            <label>Plan ID:</label>
            <input
              type="number"
              value={removePlanId}
              onChange={(e) => setRemovePlanId(e.target.value)}
            />
          </div>
          <button type="submit">Remove Benefits</button>
        </form>
        {removeBenefitsMessage && (
          <p style={{ color: 'green' }}>{removeBenefitsMessage}</p>
        )}
      </section>

      {/* SMS Offers */}
      <section>
        <h2>SMS Offers</h2>
        <form onSubmit={fetchSmsOffers} className={styles.form}>
          <div>
            <label>Mobile No:</label>
            <input
              type="text"
              value={smsMobileNo}
              onChange={(e) => setSmsMobileNo(e.target.value)}
            />
          </div>
          <button type="submit">Fetch SMS Offers</button>
        </form>
        {smsOffers.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Benefit ID</th>
                <th>Internet Offered</th>
                <th>SMS Offered</th>
                <th>Minutes Offered</th>
              </tr>
            </thead>
            <tbody>
              {smsOffers.map((offer, index) => (
                <tr key={index}>
                  <td>{offer.benefitID}</td>
                  <td>{offer.internet_offered}</td>
                  <td>{offer.SMS_offered}</td>
                  <td>{offer.minutes_offered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminPage;
