import './Register.css'

const Register = () => {
  return (
    <div className='container'>
        
        <div className='form-container'>
            <p className='register-heading'>Register!</p>
            <div className='field-container'>
                <label htmlFor='username'>Username</label>
                <input type="text" id="username" required />
            </div>
            <div className='field-container'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' required/>
            </div>
            <div className='field-container'>
                <label htmlFor='totalincome'>Total Income</label>
                <input type="number" id="totalincome" required/>
            </div>
            <button className='button'>Register</button>
            <span>
                <span>Already have an account ? </span> <span className='login-text'>Login here</span>
            </span>
            
            
            
        </div>
    </div>
  )
}

export default Register