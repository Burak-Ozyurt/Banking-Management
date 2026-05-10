import { useState } from 'react'
import Home from './components/Home';
import Customer from './components/Customer';
import Account from './components/Account';
import Depositor from './components/Depositor';
import About from './components/About';
import Pdf from './components/Pdf';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [page, setPage] = useState('home');

  const handle = (arg) => {
      setPage(arg);
  }
  return (
    <div>

      <ul style={{ display: 'flex', gap: '15px', listStyleType: 'none', background: '#006699', padding: '15px', margin: 0 }}>
        <li><a style={{color: 'white', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => handle('home')}>Home</a></li>
        <li><a style={{color: 'wheat', cursor: 'pointer'}} onClick={() => handle('account')}>Accounts</a></li>
        <li><a style={{color: 'wheat', cursor: 'pointer'}} onClick={() => handle('customer')}>Customers</a></li>
        <li><a style={{color: 'wheat', cursor: 'pointer'}} onClick={() => handle('depositor')}>Depositors</a></li>
        <li><a style={{color: 'wheat', cursor: 'pointer'}} onClick={() => handle('pdf')}>PDF</a></li>
        <li><a style={{color: 'wheat', cursor: 'pointer'}} onClick={() => handle('about')}>About</a></li>
      </ul>

      <div style={{ marginTop: '20px' }}>
        {page === 'home' && <Home/>}
        {page === 'account' && <Account/>}
        {page === 'customer' && <Customer/>}
        {page === 'depositor' && <Depositor/>}
        {page === 'pdf' && <Pdf/>}
        {page === 'about' && <About/>}
      </div>
    </div>
  )
}

export default App