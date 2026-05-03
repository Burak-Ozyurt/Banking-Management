import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DepositorList = () => {
    const [depositors, setDepositors] = useState([]);

    useEffect(() => {
        api.get('/depositors')
            .then(res => setDepositors(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDownloadReport = () => {
        api.get('/depositors/report/pdf')
            .then(res => alert(res.data))
            .catch(err => alert("İlişki raporu alınırken hata oluştu."));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Müşteri - Hesap İlişkileri</h2>
            <button onClick={handleDownloadReport} style={{ marginBottom: '15px', backgroundColor: '#006699', color: 'white', padding: '10px' }}>
                İlişki Raporu (PDF) İndir
            </button>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>İlişki ID</th>
                        <th>Müşteri Adı</th>
                        <th>Hesap Numarası</th>
                        <th>Oluşturulma Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    {depositors.map(dep => (
                        <tr key={dep.id}>
                            <td>{dep.id}</td>
                            {/* Nested (İç içe) objelerden veri çekiyoruz */}
                            <td>{dep.customer?.name}</td>
                            <td>{dep.account?.accountNumber}</td>
                            <td>{dep.creationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepositorList;