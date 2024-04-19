import Entry from '../../components/Entry/Entry';
import { userContext } from '../../App';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {

  const navigate = useNavigate();
  const {user} = useContext(userContext);
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])
  return (
    <Entry/>
  
    )
}

export default Login