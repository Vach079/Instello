import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import './trends.scss'
function Trends() {
  const arrTrends = [
    { title: 'artificial intelligence', countPost: '1,245,62 post' },
    { title: 'Web developers', countPost: ' 1,624 post' },
    { title: 'Ui Designers', countPost: '820 post' },
    { title: 'affiliate marketing', countPost: '480 post' },
  ]
  return (
    <div className="trends">
      <div className='title'>
        <h3>Trends for you</h3>
        <FlipCameraAndroidIcon sx={{ fontSize: '25px', color: 'white' }} />
      </div>
      {arrTrends.map((item,index) => {
        return (
            <div className='userBlock' key={index}>
              <i className="fa-solid fa-chart-simple"></i>
              <span className='userInformation'>
                <span>{item.title}</span>
                <br />
                <span className='infoBottom'>{item.countPost}</span>
              </span>
            </div>
        )
      })}
    </div>
  )
}

export default Trends