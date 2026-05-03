import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ background: '#006699', padding: '15px', color: 'white' }}>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '18px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ana Sayfa</Link>
                <Link to="/customers" style={{ color: 'white', textDecoration: 'none' }}>Müşteriler</Link>
                <Link to="/accounts" style={{ color: 'white', textDecoration: 'none' }}>Hesaplar</Link>
                <Link to="/depositors" style={{ color: 'white', textDecoration: 'none' }}>İlişkiler</Link>
            </div>
        </nav>
    );
};

export default Navbar;