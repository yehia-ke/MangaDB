import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './admincss.module.css';

function Admin2() {
    const navigate = useNavigate(); // Initialize navigate function
    const [wallets, setWallets] = useState([]);
    const [eshops, setEshops] = useState([]); // New state to store E-shop details
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiUrl = 'https://localhost:7281/api/admin'; // Replace with your actual API URL

    useEffect(() => {
        fetchWalletDetails();
        fetchEshopDetails(); // Fetch E-shop details
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
        </div>
    );
}

export default Admin2;
