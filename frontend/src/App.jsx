import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import AccountList from './components/AccountList';
import DepositorList from './components/DepositorList';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Sayfa Rotaları */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/depositors" element={<DepositorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;