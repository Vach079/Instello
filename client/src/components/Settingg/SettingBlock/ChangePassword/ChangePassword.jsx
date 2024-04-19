import { useContext, useState } from 'react';
import './changePassword.scss'
import api from '../../../../axios';
import { userContext } from '../../../../App';

function ChangePassword() {
  const {user} = useContext(userContext);
  console.log(user);
  function submit(e) {
    e.preventDefault()
    api.patch(`auth/updatePass/${user?._id}`, {
      password:password,
      newPassword:newPassword,
      repeatPassword:repeatPassword,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [password,setPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [repeatPassword,setRepeatPassword] = useState('');
  return (
    <div className='changePass'>
      <form onSubmit={submit}>
       
        <div className='changeBlock'>
          <p>Current Password</p>
          <input type="password" placeholder='********' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='changeBlock'>
          <p>New Password</p>
          <input type="password" placeholder='********' onChange={(e)=>{setNewPassword(e.target.value)}}/>
        </div>
        <div className='changeBlock'>
          <p>Repeat Password</p>
          <input type="password" placeholder='********' onChange={(e)=>setRepeatPassword(e.target.value)}/>
        </div>
        <span>
          <button  style={{ background: '#334150FF' }}>Chanel</button>
          <button type='submit' style={{ background: '#DB2777FF' }}>Save</button>
        </span>
      </form>
    </div>
  )
}

export default ChangePassword