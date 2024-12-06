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
    const [highestVoucher, setHighestVoucher] = useState([]);
    const [remainingAmountPlan, setRemainingAmountPlan] = useState([]);
    const [extraAmountPlan, setExtraAmountPlan] = useState([]);
    const [topPayments, setTopPayments] = useState([]);

    const [shops, setShops] = useState([]);
    const [subscribedPlans5Months, setSubscribedPlans5Months] = useState([]);
    const [cashbackAmount, setCashbackAmount] = useState([])

    const setError = async (err) => {
        alert(err);
    };

    // Input states
    const [plan_name, setPlanName] = useState('');
    const [start_date, setStart_Date] = useState('');
    const [end_date, setEnd_Date] = useState('');
    const [nid, setNid] = useState('')
    const [plan__name, setPlan_name] = useState('')
    const [plan___name, setPlan__name] = useState('')
    const [renewMobileNo, setRenewMobileNo] = useState(''); // For Renew Subscriptions
    const [renewAmount, setRenewAmount] = useState(''); // For Renew subsriptions
    const [renewPaymentMethod, setRenewPaymentMethod] = useState(''); // For Renew Subscriptions
    const [renewPlanId, setRenewPlanId] = useState(''); // For Renew Subscriptions
    const [cashbackMobileNo, setCashbackMobileNo] = useState(''); // For Payment Wallet Cashback
    const [cashbackPaymentID, setCashbackPaymentID] = useState(''); // For Payment Wallet Cashback
    const [cashbackBenefitID, setCashbackBenefitID] = useState(''); // For Payment Wallet Cashback
    const [cashbackMobileNo2, setCashbackMobileNo2] = useState(''); // For Payment Wallet Cashback 2
    const [cashbackPaymentID2, setCashbackPaymentID2] = useState(''); // For Payment Wallet Cashback 2
    const [cashbackBenefitID2, setCashbackBenefitID2] = useState(''); // For Payment Wallet Cashback 2
    const [rechargeMobileNo, setRechargeMobileNo] = useState(''); // For Recharge Balance
    const [rechargeAmount, setRechargeAmount] = useState(''); // For Recharge Balance
    const [rechargePaymentMethod, setRechargePaymentMethod] = useState(''); // For Recharge Balance
    const [redeemMobileNo, setRedeemMobileNo] = useState(''); // For Redeem Voucher
    const [redeemVoucherID, setRedeemVoucherID] = useState(''); // For Redeem Voucher


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
      fetchHighestVoucher();
      fetchRemainingAmountPlan();
      fetchExtraAmountPlan();
      fetchTopPayments();
      fetchShops();
      fetchSubscribedPlans5Months();
      renewSubscription();
      paymentWalletCashback();
      paymentWalletCashback2();
      rechargeBalance();
      redeemVoucher();
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

    const fetchUnresolvedTickets = async (e) => { //amount of unresolved tickets
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

    const fetchHighestVoucher = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hassan/highest-voucher`, {
                params: { mobileNo },
            });
            setHighestVoucher(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch highest voucher.');
            setLoading(false);
        }
    };

    const fetchTopPayments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hassan/top-payments`, {
                params: { mobileNo },
            });
            setTopPayments(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch your top payments.');
            setLoading(false);
        }
    };

    const fetchRemainingAmountPlan = async (e) => { //remaining plan amount
        e.preventDefault();
        if (!plan__name) {
            setError('Please provide a Plan Name.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hassan/remaining-amount`, {
                params: { mobileNo, plan__name },
            });
            setRemainingAmountPlan(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch remaining amount for this plan.');
            setLoading(false);
        }
    };

    const fetchExtraAmountPlan = async (e) => { //remaining plan amount
        e.preventDefault();
        if (!plan___name) {
            setError('Please provide a Plan Name.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hassan/extra-amount`, {
                params: { mobileNo, plan___name },
            });
            setExtraAmountPlan(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch extra amount for this plan.');
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

    const fetchShops = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hamed/shops`);
            setShops(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch shops.');
            setLoading(false);
        }
    }

    const fetchSubscribedPlans5Months = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}hamed/subscribed-plans-5-months`,
            { params: {mobileNo}
        });
            setSubscribedPlans5Months(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch subscribed plans in the past 5 months.');
            setLoading(false);
        }
    }

    const renewSubscription = async (e) => {
        e.preventDefault();
        if (!renewAmount || !renewPaymentMethod || !renewPlanId) {
            setError('Please provide a valid Mobile Number, Amount, Payment Method, and Plan ID.');
            return;
        }
        try {
        setLoading(true);
            const response = await axios.post(
                `${apiUrl}hamed/renew-subscription?MobileNo=${encodeURIComponent(mobileNo)}&Amount=${encodeURIComponent(parseFloat(renewAmount))}&PaymentMethod=${encodeURIComponent(renewPaymentMethod)}&PlanId=${encodeURIComponent(renewPlanId)}`);
            setError("Subscription Renewed Successfully");
            setLoading(false);
        } catch (err) {
            setError('Failed to renew Subscription.');
            setLoading(false);
        }
    }
    const paymentWalletCashback = async (e) => {
        e.preventDefault();
        if (!cashbackPaymentID || !cashbackBenefitID) {
            setError('Please provide a valid Payment ID, and Benefit ID.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiUrl}hamed/payment-wallet-cashback?MobileNo=${encodeURIComponent(mobileNo)}&PaymentID=${encodeURIComponent(parseInt(cashbackPaymentID))}&BenefitID=${encodeURIComponent(parseInt(cashbackBenefitID))}`);
            setError("Wallet Updated Successfully.");
            setLoading(false);
        } catch (err) {
            setError('Failed to update wallet.');
            setLoading(false);
        }
    }
    const paymentWalletCashback2 = async (e) => {
        e.preventDefault();
        if (!cashbackPaymentID2 || !cashbackBenefitID2) {
            setError('Please provide a valid Payment ID, and Benefit ID.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.get(
                `${apiUrl}hamed/payment-wallet-cashback-2?MobileNo=${encodeURIComponent(mobileNo)}&PaymentID=${encodeURIComponent(parseInt(cashbackPaymentID2))}&BenefitID=${encodeURIComponent(parseInt(cashbackBenefitID2))}`);
            setCashbackAmount(response.data);
            setError("Wallet Updated Successfully.");
            setLoading(false);
        } catch (err) {
            setError('Failed to update wallet.');
            setLoading(false);
        }
    }
    const rechargeBalance = async (e) => {
        e.preventDefault();
        if (!rechargeMobileNo || !rechargeAmount || !rechargePaymentMethod) {
            setError('Please provide a valid Mobile Number, Amount, and Payment Method.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiUrl}hamed/recharge-balance?MobileNo=${encodeURIComponent(rechargeMobileNo)}&Amount=${encodeURIComponent(parseFloat(rechargeAmount))}&PaymentMethod=${encodeURIComponent(rechargePaymentMethod)}`);
            setError("Balance Recharged Successfully.");
            setLoading(false);
        } catch (err) {
            setError('Failed to recharge balance.');
            setLoading(false);
        }
    }
    const redeemVoucher = async (e) => {
        e.preventDefault();
        if (!redeemVoucherID) {
            setError('Please provide a valid Voucher ID.');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiUrl}hamed/redeem-voucher?MobileNo=${encodeURIComponent(mobileNo)}&VoucherID=${encodeURIComponent(parseFloat(redeemVoucherID))}`);
            setError("Voucher Redeemed Successfully.");
            setLoading(false);
        } catch (err) {
            setError("Not enough points to redeem Voucher");
            setLoading(false);
        }
    }
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
            <label className={styles.label}>Plan name:</label>
            <input className={styles.inputs}
              type="text"
              value={plan_name}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>Start Date:</label>
            <input className={styles.inputs}
              type="date"
              value={start_date}
              onChange={(e) => setStart_Date(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label}>End Date:</label>
            <input className={styles.inputs}
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
                                  <td>{new Date(benefit.validity_date).toLocaleDateString()}</td>
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
                      <label className={styles.label}>National ID:</label>
                      <input className={styles.inputs}
                          type="text"
                          value={nid}
                          onChange={(e) => setNid(e.target.value)}
                      />
                  </div>
                  
                  <button type="submit">Fetch Amount of Unresolved Tickets</button>
              </form>
              {unresolvedTickets.length > 0 && (
                  <table>
                      <thead>
                          <tr>
                              <th>Number of Unresolved Tickets</th>
                          </tr>
                      </thead>
                      <tbody>
                          {unresolvedTickets.map((ticket, index) => (
                              <tr key={index}>
                                  <td>{ticket[""]}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </section>

          {/* Highest Voucher */}
          <section>
              <h2>Highest Voucher</h2>
              <table>
                  <thead>
                      <tr>
                          <th>Voucher ID</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      {highestVoucher.map((voucher, index) => (
                          <tr key={index}>
                              <td>{voucher.voucherID}</td>
                             
                          </tr>
                      ))}
                  </tbody>
              </table>
          </section>

          {/* Remaining Plan Amount */}
          <section>
              <h2>Remaining Plan Amount</h2>
              <form onSubmit={fetchRemainingAmountPlan} className={styles.form}>
                  <div>
                      <label className={styles.label}>Plan name:</label>
                      <input className={styles.inputs}
                          type="text"
                          value={plan__name}
                          onChange={(e) => setPlan_name(e.target.value)}
                      />
                  </div>
                  
                  <button type="submit">Fetch Remaining Plan Amount</button>
              </form>
              {remainingAmountPlan.length > 0 && (
                  <table>
                      <thead>
                          <tr>
                              <th>Remaining Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          {remainingAmountPlan.map((amount, index) => (
                              <tr key={index}>
                                  <td>{amount.RemainingAmount}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </section>

          {/* Extra Plan Amount */}
          <section>
              <h2>Extra Plan Amount</h2>
              <form onSubmit={fetchExtraAmountPlan} className={styles.form}>
                  <div>
                      <label className={styles.label}>Plan name:</label>
                      <input className={styles.inputs}
                          type="text"
                          value={plan___name}
                          onChange={(e) => setPlan__name(e.target.value)}
                      />
                  </div>

                  <button type="submit">Fetch Extra Plan Amount</button>
              </form>
              {extraAmountPlan.length > 0 && (
                  <table>
                      <thead>
                          <tr>
                              <th>Extra Amount</th>
                          </tr>
                      </thead>
                      <tbody>
                          {extraAmountPlan.map((amount, index) => (
                              <tr key={index}>
                                  <td>{amount.extraAmount}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </section>
        {/* Shops */}
        <section>
            <h2>Shops</h2>
            <table>
                <thead>
                    <tr>
                        <th>Shop ID</th>
                        <th>Name</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.map((shop, index) => (
                        <tr key={index}>
                            <td>{shop.shopID}</td>
                            <td>{shop.name}</td>
                            <td>{shop.Category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        {/* Subscribed Plans in the Past 5 Months */}
        <section>
            <h2>Subscribed Plans in the Past 5 Months</h2>
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
                    {subscribedPlans5Months.map((plan5Months, index) => (
                        <tr key={index}>
                            <td>{plan5Months.planID}</td>
                            <td>{plan5Months.name}</td>
                            <td>{plan5Months.price}</td>
                            <td>{plan5Months.SMS_offered}</td>
                            <td>{plan5Months.minutes_offered}</td>
                            <td>{plan5Months.data_offered}</td>
                            <td>{plan5Months.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        {/* Renew Subscription */}
        <section>
            <h2>Renew Subscription</h2>
            <form onSubmit={renewSubscription} className={styles.form}>
            <div>
                <label className={styles.label}>Mobile No:</label>
                <input className={styles.inputs}
                type="text"
                value={renewMobileNo}
                onChange={(e) => setRenewMobileNo(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>Amount:</label>
                <input className={styles.inputs}
                type="number"
                value={renewAmount}
                onChange={(e) => setRenewAmount(e.target.value)}
                />
            </div>       
            <div>
                <label className={styles.label}>Payment Method:</label>
                <input className={styles.inputs}
                type="text"
                value={renewPaymentMethod}
                onChange={(e) => setRenewPaymentMethod(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>Plan ID:</label>
                <input className={styles.inputs}
                type="number"
                value={renewPlanId}
                onChange={(e) => setRenewPlanId(e.target.value)}
                />
            </div>
            <button type="submit">Renew Subscription</button>
            </form>
        </section>

        {/* Payment Wallet Cashback */}
        <section>
            <h2>Payment Wallet Cashback</h2>
            <form onSubmit={paymentWalletCashback} className={styles.form}>
            <div>
                <label className={styles.label}>Payment ID:</label>
                <input className={styles.inputs}
                type="number"
                value={cashbackPaymentID}
                onChange={(e) => setCashbackPaymentID(e.target.value)}
                />
            </div>       
            <div>
                <label className={styles.label}>Benefit ID:</label>
                <input className={styles.inputs}
                type="number"
                value={cashbackBenefitID}
                onChange={(e) => setCashbackBenefitID(e.target.value)}
                />
            </div>
            <button type="submit">Payment Wallet Cashback</button>
            </form>
        </section>
        {/* Payment Wallet Cashback 2 */}
        <section>
            <h2>Payment Wallet Cashback 2</h2>
            <form onSubmit={paymentWalletCashback2} className={styles.form}>
            <div>
                <label className={styles.label}>Payment ID:</label>
                <input className={styles.inputs}
                type="number"
                value={cashbackPaymentID2}
                onChange={(e) => setCashbackPaymentID2(e.target.value)}
                />
            </div>       
            <div>
                <label className={styles.label}>Benefit ID:</label>
                <input className={styles.inputs}
                type="number"
                value={cashbackBenefitID2}
                onChange={(e) => setCashbackBenefitID2(e.target.value)}
                />
            </div>
            <button type="submit">Payment Wallet Cashback 2</button>
            </form>
                {cashbackAmount !== null && (
                    <div>
                        <h2 className={styles.h2}>Cashback Amount: {cashbackAmount}</h2> {/* Show the actual cashback amount */}
                    </div>
                )}
        </section>
        {/* Recharge Balance */}
        <section>
            <h2>Recharge Balance</h2>
            <form onSubmit={rechargeBalance} className={styles.form}>
            <div>
                <label className={styles.label}>Mobile No:</label>
                <input className={styles.inputs}
                type="text"
                value={rechargeMobileNo}
                onChange={(e) => setRechargeMobileNo(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label}>Amount:</label>
                <input className={styles.inputs}
                type="number"
                value={rechargeAmount}
                onChange={(e) => setRechargeAmount(e.target.value)}
                />
            </div>       
            <div>
                <label className={styles.label}>Payment Method:</label>
                <input className={styles.inputs}
                type="text"
                value={rechargePaymentMethod}
                onChange={(e) => setRechargePaymentMethod(e.target.value)}
                />
            </div>
            <button type="submit">Recharge Balance</button>
            </form>
        </section>
        {/* Redeem Voucher */}
        <section>
            <h2>Redeem Voucher</h2>
            <form onSubmit={redeemVoucher} className={styles.form}>
            <div>
                <label className={styles.label}>Voucher ID:</label>
                <input className={styles.inputs}
                type="number"
                value={redeemVoucherID}
                onChange={(e) => setRedeemVoucherID(e.target.value)}
                />
            </div>
            <button type="submit">Redeem Voucher</button>
            </form>
        </section>
      </div>

  );

}

export default CustomerPage;

