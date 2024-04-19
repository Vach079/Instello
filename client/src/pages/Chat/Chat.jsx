import React from 'react';
import Aside from '../../components/aside/Aside';
import './chat.scss';
import { useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { userContext } from '../../App';
import MessageSender from '../../components/messageSender/MessageSender';
import ChatUserSearch from '../../components/ChatUsetSearch/ChatUserSearch';


function Chat({socket}) {
  const navigate = useNavigate()

  const { user } = useContext(userContext);

  const [oneUserInfo, setOneUserInfo] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, []);

  return (
    <>
      <Aside />
      <main className='chatMain'>
        <div className='chat'>
          <ChatUserSearch oneUserInfo={oneUserInfo} setOneUserInfo={setOneUserInfo}/>
          <MessageSender socket={socket} oneUserInfo={oneUserInfo} setOneUserInfo={setOneUserInfo}/>
        </div>
      </main>
    </>
  )
}

export default Chat