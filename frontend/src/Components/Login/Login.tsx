import { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../Context/Context';

const Login = () => {

    const {setUserName, setIsLogin} = useContext(DataContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async() => {
        if(username.length === 0 || password.length === 0) {
            alert('All fields are required!!');
            return;
        }

        const credentials = {
            username,
            password
        }

        try {
            const response = await fetch('http://localhost:4000/fingrow/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if(response.status === 200) {
                console.log('Login successfull');
                // alert('Successfully logged in');
                const data = await response.json();
                console.log(data);
                setIsLogin(true);
                setUserName(data.username);
                navigate('/home');
            } 
            else if(response.status === 404) {
                setUsername('');
                setPassword('');
                alert('Not a valid username');
            } 
            else if(response.status === 401) {
                setPassword('');
                alert('Incorrect password');
            }
            else {
                alert("Login failed!!");
            }
        } catch (error) {
            console.error('There was a problem with the Login:', error);
            alert('Login failed');
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

export default Login;