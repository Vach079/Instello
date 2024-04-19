import './joinNow.scss'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../RegisterValidation/RegisterValidation';
import { userContext } from '../../App';
import { useContext, useEffect } from 'react';
function JoinNow() {
  
  const {user} = useContext(userContext);
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])
  function submit(e) {
    e.preventDefault()
    console.log('it work');
    axios.post('http://localhost:4000/auth/register', {
      login: login,
      phoneNumber: phone,
      email: email,
      password: password,
    })
      .then(function (response) {
        console.log(response);
        navigate('/')
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const [login, setLogin] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  return (
    <div className="joinNow">
      <div className='logo'></div>
      <form onSubmit={submit} onBlur={() => setErrors(handleError({ login, phone, email, password }))}>
        <input
          type="text"
          placeholder='Login'
          value={login}
          name='login'
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="number"
          placeholder='phoneNumber'
          value={phone}
          name='phoneNumber'
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder='email'
          value={email}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {Object.keys(errors).length !== 0 && <div className='error'>
          {errors.loginErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.loginErr}</span>}
          {errors.phoneErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.phoneErr}</span>}
          {errors.emailErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.emailErr}</span>}
          {errors.passwordErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.passwordErr}</span>}
        </div>}
        <button type='submit' >Get Started</button>
        <p><span>i have account?</span><span>-</span><Link to='/login' style={{ color: 'gray', fontSize: '18px' }}>Login</Link></p>
      </form>
    </div>
  )
}

export default JoinNow