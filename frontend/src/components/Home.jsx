import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: '#006699', fontSize: '48px' }}>Banka Yönetim Sistemine Hoş Geldiniz</h1>
            <p style={{ fontSize: '20px', color: '#555', marginBottom: '40px' }}>
                Müşteri, hesap ve işlem kayıtlarınızı tek bir merkezden güvenle yönetin.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <Link to="/customers" style={cardStyle}>
                    <h3>Müşteri Yönetimi</h3>
                    <p>Müşteri kayıtlarını gör, yeni müşteri ekle ve PDF raporu al.</p>
                </Link>

                <Link to="/accounts" style={cardStyle}>
                    <h3>Hesap Yönetimi</h3>
                    <p>Banka hesaplarını listele, bakiye görüntüle ve PDF raporu al.</p>
                </Link>

                <Link to="/depositors" style={cardStyle}>
                    <h3>İlişki Yönetimi</h3>
                    <p>Müşterileri hesaplara ata ve ortak hesap ilişkilerini yönet.</p>
                </Link>
            </div>
        </div>
    );
};

// Basit bir kart stili
const cardStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '250px',
    textDecoration: 'none',
    color: 'black',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
};

export default Home;