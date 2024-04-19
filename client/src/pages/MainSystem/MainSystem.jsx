import Storiessection from "../../components/storiesSection/Storiessection";
import LeftSection from "../../components/leftSection/LeftSection";
import RightSection from "../../components/rightSection/RightSection";
import Aside from "../../components/aside/Aside";
import './mainSystem.scss'
import { useContext } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MainSystem() {

  const navigate = useNavigate()

  const { user } = useContext(userContext);


  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])

  return (
    <>
      <Aside />
      <main className="mainSite">
        <Storiessection/>
        <LeftSection />
        <RightSection />
      </main>
    </>
  )
}

export default MainSystem