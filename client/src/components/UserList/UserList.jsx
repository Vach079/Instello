import './userList.scss';
import avatar2 from '../../images/avatar-2.jpg'
import avatar3 from '../../images/avatar-3.jpg'
import avatar4 from '../../images/avatar-4.jpg'
import avatar5 from '../../images/avatar-5.jpg'
import avatar7 from '../../images/avatar-7.jpg'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
function UserList() {
  const blockInfo = [
    { name: 'Johnson Smith', text: 'Suggested For You', url: avatar7, },
    { name: 'James Lewis', text: ' Followed by Johnson ', url: avatar5, },
    { name: 'John Michael', text: 'Followed by Monroe', url: avatar2, },
    { name: 'Monroe Parker', text: 'Suggested For You', url: avatar3, },
    { name: '  Martin Gray', text: 'Suggested For You', url: avatar4, },

  ]
  return (
    <div className="userList">
      <div className='title'>
        <h3>Peaple You might know</h3>
        <FlipCameraAndroidIcon sx={{ fontSize: '35px', color: 'white' }} />
      </div>
      {blockInfo.map((item,index) => {
        return (
            <div className='userBlock' key={index}>
              <img src={item.url} alt="user" />
              <span className='userInformation'>
                <span>{item.name}</span>
                <br />
                <span className='infoBottom'>{item.text}</span>
              </span>
              <button>Follow</button>
            </div>
        )
      })}
    </div>
  )
}

export default UserList
