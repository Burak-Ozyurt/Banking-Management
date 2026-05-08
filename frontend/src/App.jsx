import { useState } from 'react'
import Home from './components/Home';
import Customer from './components/CustomerList';
import Car from './components/AccountList';
import Rental from './components/DepositorList';
import About from './components/About';
import Pdf from './components/Pdf';
import './App.css'

function App() {
  const [page, setPage] = useState('home');

  const handle = (arg) => {
      setPage(arg);
  }
  return (
    <div>
      <ul>
        <li><a style={{color: 'white'}} onClick={() => handle('home')}>Home</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('account')}>Accounts</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('customer')}>Customers</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('depositor')}>Depositors</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('pdf')}>Pdf</a></li>
        <li><a style={{color: 'wheat'}} onClick={() => handle('about')}>About</a></li>
      </ul>
      {page === 'home' && <Home/>}
      {page === 'account' && <Account/>}
      {page === 'customer' && <Customer/>}
      {page === 'depositor' && <Depositor/>}
      {page === 'pdf' && <Pdf/>}
      {page === 'about' && <About/>}
    </div>
  )
}

export default App
