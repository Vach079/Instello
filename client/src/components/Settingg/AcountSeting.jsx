import './acountSetting.scss'
import GeneralSet from './SettingBlock/General/GeneralSet';
import SocialLinks from './SettingBlock/SocialLinks/SocialLinks';
import ChangePassword from './SettingBlock/ChangePassword/ChangePassword';
import UpdateImg from './SettingBlock/UpdateMainImage/UpdateImg';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { SiGeneralelectric } from "react-icons/si";
import { FaLink } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineBrowserUpdated } from "react-icons/md";

function AcountSeting() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate()
  function submit(e) {
    e.preventDefault()
    api.delete(`auth/${user?._id}`)
      .then(function (response) {
        console.log(response);
        setUser(null)
        localStorage.clear();
        navigate('/register')
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // const [general, setGeneral] = useState(true);
  const [socialLinks, setSocialLinks] = useState(false);
  const [password, setPassword] = useState(false);
  const [updateImg, setUpdateImg] = useState(false);
  return (
    <main className='setting_left_block'>
      <div className='go_back'>
        <Link to='/'><i className="fa-solid fa-chevron-left"></i> Back</Link>
        <h1>Settings</h1>
      </div>
      <div className='settingBar'>
        <div className='settingUser'>
          {user?.profilePicture === '' ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
          <span>
            <strong>{user?.login}</strong>
            <br />
            <br />
            <span>@{user?.login}</span>
          </span>
        </div>
        <div className="settingNavBar">
          <SiGeneralelectric className='icon' />
          <p>General</p>
          <FaLink className='icon' onClick={() => setSocialLinks(!socialLinks)}/>
          <p onClick={() => setSocialLinks(!socialLinks)}>Social Links</p>
          <MdOutlinePassword className='icon' onClick={() => setPassword(!password)}/>
          <p onClick={() => setPassword(!password)}>Password</p>
          <form onSubmit={submit}>
            <MdDelete className='icon' type='submit'/>
            <button type="submit" style={{backgroundColor:'#1E293BFF',border:'none',color:'white'}}>Delete Acount</button>
          </form>
          <MdOutlineBrowserUpdated className='icon' onClick={() => setUpdateImg(!updateImg)}/>
          <p onClick={() => setUpdateImg(!updateImg)}>Update Main Img</p>
        </div>
      </div>
      <GeneralSet />
      {socialLinks && <SocialLinks />}
      {password && <ChangePassword />}
      {updateImg && <UpdateImg />}
    </main>
  )
}

export default AcountSeting