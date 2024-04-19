import './entry.scss'
import { Link } from 'react-router-dom';
import api from '../../axios';
import { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../RegisterValidation/RegisterValidation';
import { userContext } from '../../App';
function Entry() {

  const {setUser} = useContext(userContext)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const login = {};
  const phone = {};
  const navigate = useNavigate();
  const [errors, setError] = useState({})

  function submit(e) {
    e.preventDefault()
    api.post('/auth/login', {
      password,
      email,
    })
      .then((res) => {
        const {token,user} = res.data;
        setUser(user);
        localStorage.setItem('jwtToken',token)
        localStorage.setItem('user',JSON.stringify(user))
        console.log(user);
        navigate('/')
      })
      .catch(function (error) {
        console.log(error);
        { error && setError({ ...errors, globalErr: error?.response?.data?.message }) }
      });
  }
  return (
    <div className="entry">
      <div className='logo'></div>
      <form method='get' onSubmit={submit} onBlur={() => setError(handleError({ login, phone, email, password }))}>
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        {Object.keys(errors).length !== 0 && <div className='error'>
          {errors.emailErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.emailErr}</span>}
          {errors.passwordErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.passwordErr}</span>}
          {errors.globalErr && <span style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><i className="fa-solid fa-circle-exclamation" style={{ color: "#ff0000" }}></i>{errors.globalErr}</span>}
        </div>}
        <button type='sybmit'>Sign in</button>
      </form>

      <span className='iconSpan'>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-google"></i>
        <i className="fa-brands fa-apple"></i>
      </span>
      <p><span>- No account? -</span><Link to='/register' style={{ color: 'gray', fontSize: '18px' }}>Join now</Link></p>
    </div>
  )
}

export default Entry