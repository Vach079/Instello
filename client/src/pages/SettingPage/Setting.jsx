import Aside from '../../components/aside/Aside'
import AcountSeting from '../../components/Settingg/AcountSeting';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { useContext, useEffect } from 'react'

function Setting() {
  
  const navigate = useNavigate()
  const {user,setUser} = useContext(userContext);
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])

  return (
    <>
      <Aside/>
      <AcountSeting/>
    </>
    )
}

export default Setting