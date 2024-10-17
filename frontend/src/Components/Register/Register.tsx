import { useState } from 'react';
import './Register.css'
import { Link } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [totalIncome, setTotalIncome] = useState('');

    const handleRegister = async() => {
        if(username.length === 0 || password.length === 0 || totalIncome.length === 0) {
            alert("All fields are required!!");
            return ;
        }
        const details = {
            username,
            password,
            totalIncome: Number(totalIncome),
        };

        try {
            const response = await fetch('http://localhost:4000/fingrow/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            });

            if(response.status === 201) {
                const userdata = await response.json();
                console.log('Registration successful:', userdata);
                alert("Registration Successfull");
            } 
            else if(response.status === 400) {
                alert('Username already taken, Choose another one');
            } else {
                alert("Registration failed!!");
            }
        } catch (error) {
            console.error('There was a problem with the registration:', error);
            alert('Registration failed');
        }
    }

  return (
    <div className='register-container'>
        
        <div className='form-container'>
            <p className='register-heading'>Register!</p>
            <div className='field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" required value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </div>
            <div className='field-container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' required value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className='field-container'>
                <label htmlFor='totalincome'>Total Income</label>
                <input type="number" id="totalincome" required value={totalIncome} onChange={(e) => {setTotalIncome((e.target.value))}}/>
            </div>
            <button className='button' onClick={handleRegister}>Register</button>
            <span>
                <span>Already have an account ? </span> <span className='login-text'><Link to='/login'>Login here</Link></span>
            </span>
        </div>
    </div>
  )
}

export default Register;