import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        api.get('/accounts')
            .then(res => setAccounts(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDownloadReport = () => {
        api.get('/accounts/report/pdf')
            .then(res => alert(res.data))
            .catch(err => alert("Hesap raporu alınırken hata oluştu."));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Banka Hesapları</h2>
            <button onClick={handleDownloadReport} style={{ marginBottom: '15px', backgroundColor: '#006699', color: 'white', padding: '10px' }}>
                Hesap Raporu (PDF) İndir
            </button>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Hesap ID</th>
                        <th>Hesap Numarası</th>
                        <th>Bakiye</th>
                        <th>Şube</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(acc => (
                        <tr key={acc.id}>
                            <td>{acc.id}</td>
                            <td>{acc.accountNumber}</td>
                            <td>{acc.balance} ₺</td>
                            <td>{acc.branchName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountList;