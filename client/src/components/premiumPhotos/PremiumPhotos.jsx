import './premiumPhotos.scss'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useRef, useEffect } from 'react';
import product1 from '../../images/product-1.jpg';
import product3 from '../../images/product-3.jpg';
import product5 from '../../images/product-5.jpg';

function PremiumPhotos() {
  const [prev, setPrev] = useState('');
  const count = useRef(null);
  useEffect(() => {
    const result = count.current.offsetWidth * prev
    count.current.scrollBy({ left: result, behavior: "smooth" })
  }), [prev];
  const imgArr = [product1, product3, product5];
  return (
    <div className="premiumPhotos">
      <div className='title'>
        <h3>Premium Photos</h3>
        <FlipCameraAndroidIcon sx={{ fontSize: '35px', color: 'white' }} />
      </div>
      <div className='container1'>
        <div className="slider-wrapper1">
          <button id='prev-sider1' className='buttonStories1' onClick={() => setPrev(-1)}><KeyboardArrowLeftIcon /></button>
          <div className="image-list1" ref={count} >
            {imgArr.map((item,index) => {
              return (
                  <img src={item} className='image-item1' alt="User" key={index} />
              )
            })}
          </div>


          <button id='next-sider1' className='buttonStories1' onClick={() => setPrev(1)}><ChevronRightIcon /></button>
        </div>
      </div>
    </div>
  )
}

export default PremiumPhotos