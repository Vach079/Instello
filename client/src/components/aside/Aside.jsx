import './aside.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import avatar3 from '../../images/avatar-3.jpg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
function Aside() {

  const { user, setUser } = useContext(userContext)

  const navigate = useNavigate();
  const list = [
    { iconClass: 'fa-solid fa-house', text: 'Home' },
    { iconClass: 'fa-solid fa-magnifying-glass', text: 'Search' },
    { iconClass: 'fa-regular fa-compass', text: 'Explore' },
    { iconClass: 'fa-regular fa-message', text: 'Message' },
    { iconClass: 'fa-solid fa-radio', text: 'Reels' },
    { iconClass: 'fa-regular fa-heart', text: 'Notification' },
    { iconClass: 'fa-brands fa-shopify', text: 'Shop' },
    { iconClass: 'fa-solid fa-users', text: 'Peaple' },
    { iconClass: 'fa-solid fa-circle-plus', text: 'Create' },
    { iconClass: 'fa-solid fa-inbox', text: 'Components' },
    { iconClass: 'fa-regular fa-circle-user', text: 'Profile' },
  ]
  const [open, setOpen] = useState(false);
  return (
    <aside>
      <Link to='/' className='pageName'>Instello</Link>
      <img src="https://demo.foxthemes.net/instello/assets/images/logo-icon.png" alt="logo" className='img1' />
      {list.map((item, index) => {
        if (item.text === 'Home') {
          return (
            <div className='asidemain' key={index} onClick={() => navigate('/')}>
              <i className={item.iconClass} style={{ color: 'white' }}></i>
              <p>{item.text}</p>
            </div>
          )
        } else if (item.text === 'Profile') {
          return (
            <div className='asidemain' key={index} onClick={() => navigate('/profile')}>
              <i className={item.iconClass} style={{ color: 'white' }}></i>
              <p>{item.text}</p>
            </div>
          )
        } else if (item.text === 'Message') {
          return (
            <div className='asidemain' key={index} onClick={() => navigate('/message')}>
              <i className={item.iconClass} style={{ color: 'white' }}></i>
              <p>{item.text}</p>
            </div>
          )
        } else {
          return (
            <div className='asidemain' key={index}>
              <i className={item.iconClass} style={{ color: 'white' }}></i>
              <p>{item.text}</p>
            </div>
          )
        }
      })}
      <div className='dialog' style={{ display: open ? 'block' : 'none' }} >
        <div className='userInfo'>
          <img src={avatar3} alt="User" />
          <strong>Monroe Parker</strong>
          <p className='p1'>@monroe</p>
          <Button variant="outlined" onClick={()=>setOpen(false)} sx={{ width: '90%', bgcolor: '#334155FF', height: '40px', borderRadius: '10px', color: 'white', fontSize: "12px", border: 'none',marginTop:'20px' }}>
            Close
          </Button>
        </div>
        <div className="setting">
          <span className='link' onClick={() => navigate('/profile')}>
            <PersonOutlineIcon />
            <span>Profile</span>
          </span>
          <span className='link'>
            <TurnedInNotIcon />
            <span>Upgrade</span>
          </span>
          <span className='link' onClick={() => navigate('/setting')}>
            <SettingsApplicationsIcon />
            <span>Setting</span>
          </span>
          <span className='link' onClick={() => {
            localStorage.clear();
            setUser(null);
            navigate('/login')
          }}>

            <LogoutIcon />
            <span>Log Out</span>

          </span>
        </div>
      </div>
      <div className='asidemain asidemain1'
        onClick={() => setOpen(true)}
      >
        {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
        <p>Monore Parker</p>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}


      </div>
    </aside>
  )
}

export default Aside