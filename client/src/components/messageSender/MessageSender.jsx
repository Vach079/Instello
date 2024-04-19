import React, { useContext, useEffect, useState } from 'react'
import './messageSender.scss';
import api from '../../axios';
import { userContext } from '../../App';
import { FaPhone } from "react-icons/fa6";
import { CiVideoOn } from "react-icons/ci";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';

function MessageSender({ oneUserInfo, socket, setOneUserInfo }) {

  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState('');
  const [reciveContent, setReciveContent] = useState([]);

  function submit(e) {
    e.preventDefault()
    let obj = { id: oneUserInfo?._id, senderId: user._id, message: messageContent }
    socket.emit('message send', obj)
    setReciveContent([...reciveContent, obj])
  };

  useEffect(() => {
    if (oneUserInfo) {
      api.get(`/messages/${oneUserInfo?._id}`)
        .then((res) => {
          setReciveContent(res.data)
          console.log(res);
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [oneUserInfo]);

  useEffect(() => {
    socket.on('recive message', (data) => {
      api.post(`/messages/send/${data.id}`, {
        message: data?.message,
        senderId: data.senderId,
      })
        .then((res) => {
          console.log(res.data);
          setReciveContent(prevContent => [...prevContent, res.data]);

        })
        .catch(function (error) {
          console.log(error)
        });
    })
  }, [socket])


  return (
    <div className='chattingPart'>
      <div className='recivised'>
        <span className='spanOne'>
          {oneUserInfo?.profilePicture === '' || oneUserInfo?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${oneUserInfo?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
          <span>{oneUserInfo?.login || 'UserName'}</span>
        </span>
        <span className='spanTwo'>
          <FaPhone />
          <CiVideoOn />
          <FaRegCircleQuestion />
        </span>
      </div>
      <div className='userInfo'>
        {oneUserInfo?.profilePicture === '' || oneUserInfo?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${oneUserInfo?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
        <span>{oneUserInfo?.login || 'UserName'}</span>
        <span>{oneUserInfo?.login || '@UserName'}</span>
        <button >View Profile</button>

      </div>
      <div className='messages'>
        {reciveContent && reciveContent.map((item) => {
          return (
            <div key={item._id}>
              {item.senderId !== user._id && item.message !== '' &&
                <span className='leftSpan'>
                  {oneUserInfo?.profilePicture === '' || oneUserInfo?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${oneUserInfo?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
                  <p>{item.message}</p>
                </span>
              }
              {item.senderId === user._id && item.message !== '' &&
                <span className='rigthSpan' >
                  <p>{item.message}</p>
                  {user?.profilePicture === '' || user?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${user?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
                </span>
              }
            </div>
          )
        })}
      </div>
      <div className='senderBlock'>
        <i className="fa-solid fa-circle-plus"></i>
        <i className="fa-solid fa-face-smile"></i>
        <form onSubmit={(e) => submit(e)}>
          <input type="text" className='senderInput' placeholder='Write your message' onChange={(e) => setMessageContent(e.target.value)} />
          <button type='submit' ><i className="fa-solid fa-paper-plane"></i></button>
        </form>
        <i className="fa-solid fa-heart"></i>
      </div>

    </div>
  )
}

export default MessageSender