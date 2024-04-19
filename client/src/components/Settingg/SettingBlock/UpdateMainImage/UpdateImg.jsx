import React, { useContext, useState } from 'react'
import './updateImg.scss'
import api from '../../../../axios'
import { userContext } from './../../../../App';

function UpdateImg() {

  const { user, setUser } = useContext(userContext)
  const [file, setFile] = useState();
  console.log(user);
  function submit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('img', file);

    api.patch(`/auth/${user?._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('user',JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <div className='updateImg'>
      <h1>Update Main Image</h1>
      {user?.profilePicture === '' ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
      <form onSubmit={submit}>
        <input type='file' style={{ color: 'white' }} name='filedata' placeholder='Browse to Upload image' onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit
              '>
          Update
        </button>
      </form>
    </div>
  )
}

export default UpdateImg