import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        api.get('/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => console.error("Hata:", error));
    }, []);

    const handleDownloadReport = () => {
        api.get('/customers/report/pdf')
            .then(response => alert(response.data))
            .catch(error => alert("Rapor alınırken hata oluştu."));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Müşteri Listesi</h2>
            <button onClick={handleDownloadReport} style={{ marginBottom: '15px', backgroundColor: '#006699', color: 'white', padding: '10px' }}>
                Müşteri Raporu (PDF) İndir
            </button>

            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>Şehir</th>
                        <th>Adres</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.city}</td>
                            <td>{c.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;