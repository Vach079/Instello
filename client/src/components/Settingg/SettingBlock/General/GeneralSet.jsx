import { useContext, useState } from 'react';
import api from '../../../../axios';
import './general.scss'
import { userContext } from './../../../../App';
function GeneralSet() {
  const {user} = useContext(userContext)
  function submit(e) {
    e.preventDefault()
    api.patch(`auth/updateLogEmNum/${user?._id}`, {
      login: login,
      phoneNumber: phoneNumber,
      email: email,
      password:password,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [login,setLogin] = useState('');
  const [email,setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [password,setPassword] = useState('')
  return (
    <div className="GeneralSet">
       <div className='labels' >
        <label>Current Password</label>
        <label style={{paddingTop:'10px'}}>Login</label>
        <label className='labelGeneral'>Email</label>
        <label>Phone Number</label>
      </div>
        <form className='inputs' onSubmit={submit}>
          <input type="password" className='username' onChange={(e)=>setPassword(e.target.value)}/>
          <br />
          <input type="text" className='username' onChange={(e)=>setLogin(e.target.value)}/>
          <input type="email" className='email' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="text" className='email' onChange={(e)=>setPhoneNumber(e.target.value)}/>
          
          <span>
            <button  style={{background:'#334150FF'}}>Chanel</button>
            <button type='submit' style={{background:'#DB2777FF'}}>Save</button>
          </span>
        </form> 
    </div>
  )
}

export default GeneralSet