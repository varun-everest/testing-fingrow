import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if(username.length === 0 || password.length === 0) {
            alert('All fields are required!!');
            return;
        }
    }

  return (
    <div className='login-container'>
        <div className='login-form-container'>
            <p className='login-heading'>Login!</p>
            <div className='login-field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </div>
            <div className='login-field-container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' required value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <span>
                <span>Don't you have an account ? </span> <span className='register-text'><Link to='/register'>Register here</Link></span>
            </span>
            <button className='login-button' onClick={handleLogin}>Login</button>
        </div>
    </div>
  )
}

export default Login