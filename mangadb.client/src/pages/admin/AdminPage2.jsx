import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './admincss.module.css';

function Admin2() {
    const navigate = useNavigate();
    const [wallets, setWallets] = useState([]);
    const [eshops, setEshops] = useState([]);
    const [payments, setPayments] = useState([]);
    const [cashback, setCashback] = useState([]);
    const [cashbackAmount, setCashbackAmount] = useState(null); // Should be a number or null
    const [paymentPoints, setPaymentPoints] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentPointsLoading, setPaymentPointsLoading] = useState(false);
    const [paymentPointsError, setPaymentPointsError] = useState('');
    const [walletID, setWalletID] = useState('');
    const [planID, setPlanID] = useState('');

    const apiUrl = 'https://localhost:7281/api/admin';

    useEffect(() => {
        fetchWalletDetails();
        fetchEshopDetails();
        fetchPaymentDetails();
        fetchCashbackDetails();
    }, []);

    const fetchWalletDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/wallets`);
            setWallets(response.data);
        } catch (err) {
            setError('Failed to fetch wallet details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchEshopDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/eshops/vouchers`);
            setEshops(response.data);
        } catch (err) {
            setError('Failed to fetch E-shop details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPaymentDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/payments`);
            setPayments(response.data);
        } catch (err) {
            setError('Failed to fetch payment details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCashbackDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/total-transactions`);
            setCashback(response.data);
        } catch (err) {
            setError('Failed to fetch cashback details.');
        } finally {
            setLoading(false);
        }
    };

    const handleFetchPaymentPoints = async (e) => {
        e.preventDefault();

        if (!mobileNumber) {
            setPaymentPointsError('Please enter a valid mobile number.');
            return;
        }

        setPaymentPointsLoading(true);
        setPaymentPointsError('');

        try {
            const response = await axios.get(`${apiUrl}/payment-points/${mobileNumber}`);
            setPaymentPoints(response.data);
        } catch (err) {
            setPaymentPointsError('Failed to fetch payment points.');
        } finally {
            setPaymentPointsLoading(false);
        }
    };

    // Function to fetch cashback amount based on walletID and planID
    const handleFetchCashbackAmount = async (e) => {
        e.preventDefault();
        setError('');
        setCashbackAmount(null);
        setLoading(true);

        // Validate inputs
        if (!walletID || !planID) {
            setError('Please enter both Wallet ID and Plan ID.');
            setLoading(false);
            return;
        }

        try {
            // Call the API endpoint to fetch cashback amount
            const response = await axios.get(`${apiUrl}/amount/${walletID}/${planID}`);

            // If the response is successful, set the cashback amount
            setCashbackAmount(response.data.cashbackAmount);
        } catch (err) {
            // Check if the error indicates an incorrect plan for the wallet
            if (err.response && err.response.status === 404) {
                // Assuming the API returns a 404 status for this specific case
                setError(`This wallet (ID: ${walletID}) does not have this plan (ID: ${planID}).`);
            } else {
                // Generic error message
                setError('Failed to fetch cashback amount. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h1>Admin 2</h1>
            <button
                className={styles.blackButton}
                onClick={() => navigate('/admin')}
            >
                Go Back to Admin Page
            </button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Wallets with Customer Names */}
            <section>
                <h2>Wallets and Customer Names</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Wallet ID</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet, index) => (
                            <tr key={index}>
                                <td>{`${wallet.first_name || 'N/A'} ${wallet.last_name || 'N/A'}`}</td>
                                <td>{wallet.walletID || 'N/A'}</td>
                                <td>{wallet.current_balance || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* E-shops with Voucher IDs and Values */}
            <section>
                <h2>E-shops and Vouchers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Voucher ID</th>
                            <th>Voucher Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eshops.map((eshop, index) => (
                            <tr key={index}>
                                <td>{eshop.voucherID || 'N/A'}</td>
                                <td>{eshop.value || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Payment Transactions */}
            <section>
                <h2>Payment Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Mobile No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.paymentID || 'N/A'}</td>
                                <td>{payment.amount || 'N/A'}</td>
                                <td>{new Date(payment.date_of_payment).toLocaleDateString() || 'N/A'}</td>
                                <td>{payment.payment_method || 'N/A'}</td>
                                <td>{payment.status || 'N/A'}</td>
                                <td>{payment.mobileNo || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Cashback Data */}
            <section>
                <h2>Cashback Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Wallet ID</th>
                            <th>Number of Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cashback.map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.walletID || 'N/A'}</td>
                                <td>{transaction.totalCashbackTransactions || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Payment Points */}
            <section>
                <h2>Fetch Accepted Payment Transactions And Points</h2>
                <form onSubmit={handleFetchPaymentPoints} className={styles.form}>
                    <div>
                        <label>Mobile No:</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                    <button type="submit">Fetch Payment Points</button>
                </form>

                {paymentPointsLoading && <p>Loading...</p>}
                {paymentPointsError && <p style={{ color: 'red' }}>{paymentPointsError}</p>}
                {paymentPoints && (
                    <div>
                        <p><strong>Transaction Count:</strong> {paymentPoints.transactionCount}</p>
                        <p><strong>Total Points:</strong> {paymentPoints.totalPoints}</p>
                    </div>
                )}
            </section>

            {/* Form to input Wallet ID and Plan ID */}
            <section>
                <h2>Fetch CashBack Of Wallet  </h2>

                <form onSubmit={handleFetchCashbackAmount} className={styles.form}>
                    <div>
                        <label>Wallet ID:</label>
                        <input
                            type="number"
                            value={walletID}
                            onChange={(e) => setWalletID(e.target.value)}
                            placeholder="Enter Wallet ID"
                        />
                    </div>
                    <div>
                        <label>Plan ID:</label>
                        <input
                            type="number"
                            value={planID}
                            onChange={(e) => setPlanID(e.target.value)}
                            placeholder="Enter Plan ID"
                        />
                    </div>
                    <button type="submit">Fetch Cashback Amount</button>
                </form>

                {loading && <p>Loading...</p>}

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {cashbackAmount !== null && (
                    <div>
                        <h3>Cashback Amount: {cashbackAmount}</h3> {/* Show the actual cashback amount */}
                    </div>
                )}
            </section>

        </div>
    );
}

export default Admin2;
