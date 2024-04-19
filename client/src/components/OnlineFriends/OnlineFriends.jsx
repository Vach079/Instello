import './onlineFriends.scss'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import avatar2 from '../../images/avatar-2.jpg'
import avatar3 from '../../images/avatar-3.jpg'
import avatar4 from '../../images/avatar-4.jpg'
import avatar5 from '../../images/avatar-5.jpg'
import avatar6 from '../../images/avatar-6.jpg'
import avatar7 from '../../images/avatar-7.jpg'
function OnlineFriends() {
  return (
    <div className="onlineFriends">
      <div className='title'>
        <h3>Online Friends</h3>
        <FlipCameraAndroidIcon sx={{ fontSize: '25px', color: 'white' }} />
      </div>
      <div className='userOnline'>
        <img src={avatar2} alt="userOnline" className='userOnlineImg'/>
        <img src={avatar3} alt="userOnline" className='userOnlineImg'/>
        <img src={avatar4} alt="userOnline" className='userOnlineImg'/>
        <img src={avatar5} alt="userOnline" className='userOnlineImg'/>
        <img src={avatar6} alt="userOnline" className='userOnlineImg'/>
        <img src={avatar7} alt="userOnline" className='userOnlineImg'/>
      </div>
    </div>
  )
}

export default OnlineFriends