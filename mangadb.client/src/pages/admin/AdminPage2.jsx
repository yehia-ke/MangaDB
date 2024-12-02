import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './admincss.module.css';

function Admin2() {
    const navigate = useNavigate(); // Initialize navigate function
    const [wallets, setWallets] = useState([]);
    const [eshops, setEshops] = useState([]); // State to store E-shop details
    const [payments, setPayments] = useState([]); // New state to store Payment details
    const [loading, setLoading] = useState(false);
    const setError = async(err) => {
        alert(err);
      };

    const apiUrl = 'https://localhost:7281/api/admin'; // Replace with your actual API URL

    useEffect(() => {
        fetchWalletDetails();
        fetchEshopDetails(); // Fetch E-shop details
        fetchPaymentDetails(); // Fetch Payment details
    }, []);

    // Fetch wallet details
    const fetchWalletDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/wallets`);
            console.log(response.data); // Log the response to inspect its structure
            setWallets(response.data);
        } catch (err) {
            setError('Failed to fetch wallet details.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch E-shop details
    const fetchEshopDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/eshops/vouchers`); // Replace with your actual E-shop API endpoint
            console.log(response.data); // Log the response to inspect its structure
            setEshops(response.data);
        } catch (err) {
            setError('Failed to fetch E-shop details.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch Payment details
    const fetchPaymentDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/payments`); // Replace with your actual payment API endpoint
            console.log(response.data); // Log the response to inspect its structure
            setPayments(response.data);
        } catch (err) {
            setError('Failed to fetch payment details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Admin 2</h1>
            <button
                className={styles.blackButton}
                onClick={() => navigate('/admin')} // Navigate back to Admin page
            >
                Go Back to Admin Page
            </button>

            {loading && <p>Loading...</p>}

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
        </div>
    );
}

export default Admin2;
