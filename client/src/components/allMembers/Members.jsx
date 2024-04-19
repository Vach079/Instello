import './members.scss'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid'
import avatar2 from '../../images/avatar-2.jpg'
import avatar3 from '../../images/avatar-3.jpg'
// import avatar4 from '../../images/avatar-4.jpg'
function Members() {
  const arrUser = [
    {name:'Marin Gray',folowers:'12K Followers',url:avatar2},
    {name:'Alex Park',folowers:'14K Followers',url:avatar3},
    // {name:'James Lewis',folowers:'16K Followers',url:avatar4},
  ]
  return (
    <div className="members">
      <div className='title'>
        <h3>Premium Photos</h3>
        <FlipCameraAndroidIcon sx={{ fontSize: '35px', color: 'white' }} />
      </div>
      <div className='userContanier'>
        {arrUser.map((item,index)=>{
          return(
              <div key={index}>
                  <img src={item.url} alt="user" />
                  <br />
                  <p>{item.name}</p>
                  <br />
                  <span>{item.folowers}</span>
                  <br />
                  <button>Follow</button>
              </div>
          )
        })}
      </div>
    </div>
  )
}

export default Members