import './App.css';
import api from './axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import MainSystem from './pages/MainSystem/MainSystem';
import Login from './pages/LoginPage/Login';
import Register from './pages/Register/Register';
import Setting from './pages/SettingPage/Setting';
import Profile from './pages/Profile/Profile';
import Chat from './pages/Chat/Chat';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000');

export const userContext = createContext()

const initial = JSON.parse(localStorage.getItem('user')) || undefined;


function App() {

  const [user, setUser] = useState(initial);

  useEffect(() => {
    if (!user) {

      api
        .get("/auth/get")
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
          setUser(res.data)
          console.log(user);
        })
        .catch((err) => {
          setUser(null)
          console.log(err);
        })

    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <userContext.Provider
          value={{
            user,
            setUser,
          }}>
          <Routes>
            <Route path="/" element={<MainSystem />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/message' element={<Chat socket={socket} />} />
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
