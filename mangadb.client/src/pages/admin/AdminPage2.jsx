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
    const [walletIDForAverageTransaction, setWalletIDForAverageTransaction] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [averageTransactionAmount, setAverageTransactionAmount] = useState(null);
    const [averageError, setAverageError] = useState('');
    const [loadingAverageTransaction, setLoadingAverageTransaction] = useState(false);
    const [mobileNumber2, setMobileNumber2] = useState('');
    const [mobileCheckMessage, setMobileCheckMessage] = useState('');
    const [mobileCheckError, setMobileCheckError] = useState('');
    const [mobileNumber3, setMobileNumber3] = useState('');
    const [updatePointsMessage, setUpdatePointsMessage] = useState('');
    const [updatePointsError, setUpdatePointsError] = useState('');  // Renamed error to updatePointsError
    const [updatePointsLoading, setUpdatePointsLoading] = useState(false);  // Renamed loading to updatePointsLoading


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

    // Fetch average transaction
    const handleFetchAverageTransaction = async (e) => {
        e.preventDefault();
        setAverageError('');
        setAverageTransactionAmount(null);
        setLoadingAverageTransaction(true);

        if (!walletIDForAverageTransaction || !startDate || !endDate) {
            setAverageError('Please provide Wallet ID, Start Date, and End Date.');
            setLoadingAverageTransaction(false);
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            setAverageError('Start Date cannot be later than End Date.');
            setLoadingAverageTransaction(false);
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/average-transaction/${walletIDForAverageTransaction}/${startDate}/${endDate}`);

            if (response.data.averageAmount === 0) {
                setAverageError('The Average Transaction Amount is 0. This may indicate that the Wallet ID is incorrect or there are no transactions.');
            } else {
                setAverageTransactionAmount(response.data);
            }
        } catch (err) {
            setAverageError('Failed to fetch average transaction amount. Please try again.');
        } finally {
            setLoadingAverageTransaction(false);
        }
    };


    // Function to handle mobile number check
    const handleCheckMobileNumber = async (e) => {
        e.preventDefault();
        setMobileCheckMessage('');
        setMobileCheckError('');

        if (!mobileNumber2 || mobileNumber2.length !== 11) {
            setMobileCheckError('Invalid mobile number format. Please enter an 11-digit number.');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/check-mobile/${mobileNumber2}`);

            // Set the message from the response JSON
            setMobileCheckMessage(response.data.message);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setMobileCheckMessage(err.response.data.message);
            } else {
                setMobileCheckError('An error occurred while checking the mobile number.');
            }
        }
    };

    const handleUpdatePoints = async (e) => {
        e.preventDefault();

        // Validate mobile number
        if (mobileNumber3.length !== 11) {
            setUpdatePointsError('Invalid mobile number. Please enter an 11-digit mobile number.');
            return;
        }

        setUpdatePointsLoading(true);
        setUpdatePointsMessage('');
        setUpdatePointsError('');

        try {
            const response = await axios.get(`${apiUrl}/update-point/${mobileNumber3}`);

            if (response.status === 200) {
                setUpdatePointsMessage('Points updated successfully!');
            } else {
                setUpdatePointsError(response.data.Message || 'Failed to update points.');
            }
        } catch (err) {
            setUpdatePointsError('An error occurred while updating points. Please try again.');
        } finally {
            setUpdatePointsLoading(false);
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
                <form onSubmit={handleFetchPaymentPoints}>
                    <div>
                        <label className={styles.label}>Mobile No:</label>
                        <input className={styles.inputs}
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

                <form onSubmit={handleFetchCashbackAmount}>
                    <div>
                        <label className={styles.label}>Wallet ID:</label>
                        <input className={styles.inputs}
                            type="number"
                            value={walletID}
                            onChange={(e) => setWalletID(e.target.value)}
                            placeholder="Enter Wallet ID"
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Plan ID:</label>
                        <input className={styles.inputs}
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

            {/* Average Transaction */}
            <section>
                <h2>Fetch Average Transaction</h2>
                <form onSubmit={handleFetchAverageTransaction}>
                    <div>
                        <label className={styles.label}>Wallet ID:</label>
                        <input className={styles.inputs}
                            type="number"
                            value={walletIDForAverageTransaction}
                            onChange={(e) => setWalletIDForAverageTransaction(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>Start Date:</label>
                        <input className={styles.inputs}
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={styles.label}>End Date:</label>
                        <input className={styles.inputs}
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">Fetch Average Transaction</button>
                </form>
                {loadingAverageTransaction && <p>Loading...</p>}
                {averageError && <p style={{ color: 'red' }}>{averageError}</p>}
                {averageTransactionAmount !== null && averageTransactionAmount != 0 && <p>Average Transaction Amount: {averageTransactionAmount.averageAmount}</p>}
            </section>

            <section>
                <h2>Check if Mobile Number is Linked to Wallet</h2>
                <form onSubmit={handleCheckMobileNumber}>
                    <div>
                        <label className={styles.label}>Mobile Number:</label>
                        <input className={styles.inputs}
                            type="text"
                            value={mobileNumber2}
                            onChange={(e) => setMobileNumber2(e.target.value)}
                            placeholder="Enter 11-digit mobile number"
                            required
                        />
                    </div>
                    <button type="submit">Check Mobile Number</button>
                </form>

                {/* Display error message if any */}
                {mobileCheckError && <p style={{ color: 'red' }}>{mobileCheckError}</p>}

                {/* Display success or failure message */}
                {mobileCheckMessage && <p>{mobileCheckMessage}</p>}

            </section>

            <section>
                <h1>Update Points</h1>

                <form onSubmit={handleUpdatePoints}>
                    <div>
                        <label className={styles.label}>Mobile Number:</label>
                        <input className={styles.inputs}
                            type="text"
                            value={mobileNumber3}
                            onChange={(e) => setMobileNumber3(e.target.value)}
                            placeholder="Enter 11-digit mobile number"
                            required
                        />
                    </div>
                    <button type="submit" disabled={updatePointsLoading}>Update Points</button>  {/* Updated loading state name */}
                </form>

                {updatePointsLoading && <p>Loading...</p>}  {/* Updated loading state name */}

                {/* Display messages */}
                {updatePointsMessage && <p style={{ color: 'green' }}>{updatePointsMessage}</p>}  {/* Success message */}
                {updatePointsError && <p style={{ color: 'red' }}>{updatePointsError}</p>}  {/* Error message */}
            </section>

        </div>
    );
}

export default Admin2;
