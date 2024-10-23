import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='container'>
        <h1 className='title'>Welcome to FinGrow Finance Tracker Application</h1>
        <h3 className='tag-title'>Smart Tracking for Smarter Transactions</h3>
        <div>
            <Link to='/login'><button className='Hbutton'>Login</button></Link>
            <Link to='/register'><button className='Hbutton'>Register</button></Link>
        </div>
        
    </div>
  )
}

export default Homepage;