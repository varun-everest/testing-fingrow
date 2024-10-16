import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='login-container'>
        <div className='login-form-container'>
            <p className='login-heading'>Login!</p>
            <div className='login-field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" required />
            </div>
            <div className='login-field-container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' required/>
            </div>
            <span>
                <span>Don't you have an account ? </span> <span className='register-text'><Link to='/register'>Register here</Link></span>
            </span>
            <button className='login-button'>Login</button>
        </div>
    </div>
  )
}

export default Login