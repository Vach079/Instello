import React from 'react'
import './chatUserSearch.scss';
import { useState, useContext, useEffect } from 'react';
import { userContext } from '../../App';
import api from '../../axios';

function ChatUserSender({ oneUserInfo, setOneUserInfo }) {

  const [allUserData, setAllUserData] = useState([]);

  const { user } = useContext(userContext);


  useEffect(() => {
    api.get('auth').then(function (response) {
      setAllUserData(response.data)
    })
  }, []);

  return (
    <div className='searchPart'>
      <div className='settingSearch'>
        <h1>Chat</h1>
        <span className='icons'>
          <i className="fa-solid fa-gear"></i>
          <i className="fa-solid fa-circle-check"></i>
        </span>
      </div>
      <div className="chat-search-user">
        <input type="text" id="messageInput" placeholder="Type your message..." />
        <button id="sendMessageBtn">Send</button>
      </div>
      <div className='allUsers'>
        {allUserData.map((item) => item._id !== user._id &&
          <div onClick={() => setOneUserInfo(item)} key={item._id}>
            {item?.profilePicture === '' || item?.profilePicture == undefined ? <img src='https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='mainUserImage' className='mainImage' /> : <img src={`http://localhost:4000/${item?.profilePicture}`} alt="mainUserImage" className='mainImage' />}
            <span>
              <strong>{item.login}</strong>
              <p>End Message Content</p>
            </span>
            <p className='oldMessageTime'>Old Time</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatUserSender