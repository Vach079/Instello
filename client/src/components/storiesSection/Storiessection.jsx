import './storiesSection.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useRef, useEffect, useContext } from 'react';
import api from '../../axios'
import { userContext } from '../../App';

function Storiessection() {

  const [prev, setPrev] = useState('');

  const count = useRef(null);

  const [userData, setUserData] = useState([]);

  const { user } = useContext(userContext);

  useEffect(() => {
    api.get('auth').then(function (response) {
      setUserData(response.data)
    })
    const result = count.current.offsetWidth * prev

    count.current.scrollBy({ left: result, behavior: "smooth" })
  }), [prev];


  return (
    <section className="topSection">
      <div className='textStories'>
        <h3>Stories</h3>
      </div>
      <div className='container'>
        <div className="slider-wrapper">
          <button id='prev-sider' className='buttonStories' onClick={() => setPrev(-1)}><KeyboardArrowLeftIcon /></button>
          <div className="image-list" ref={count} >
            {userData.filter((item) => item._id !== user._id).map((itemm) => {
              return (
                <>
                  {itemm?.profilePicture === '' || itemm?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='image-item' key={itemm._id} /> : <img src={`http://localhost:4000/${itemm?.profilePicture}`} alt="mainUserImage" className='image-item' key={itemm._id}/>}
                </>
              )
            })}
          </div>
          <button id='next-sider' className='buttonStories' onClick={() => setPrev(1)}><ChevronRightIcon /></button>
        </div>
      </div>
    </section>
  )
}

export default Storiessection
