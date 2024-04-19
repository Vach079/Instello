const express = require("express");

const app = express();

const mongoose = require("mongoose");

const authRouter = require("./router/authRouter");

const postsRouter = require("./router/postsRouter");

const commentRouter = require("./router/commentRouter");

const messageRouter = require('./router/messageRouter');

const socket = require('socket.io');

const cors = require("cors");

const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"uploads/");
  },
  filename: (req,file,cb) => {
    cb(null,Date.now() + "-" + file.originalname);
  },
})

app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(express.json());

app.use(multer({storage:storageConfig}).single("img"));

app.use(
  cors({
    origin: ["http://localhost:5173/",'http://localhost:5173']
  })
);
app.use("/auth", authRouter);

app.use("/posts", postsRouter);

app.use('/comment',commentRouter);

app.use('/messages',messageRouter);

mongoose
  .connect('mongodb://localhost:27017/Social')
  .then(() => {
    console.log('DB Conection Sucsesfuly');
  })
  .catch((err) => {
    console.log(err.message);
  })

const server = app.listen(4000, (err) => {
  err ? console.log(err) : console.log("Server on port 4000");
});

const io = socket(server,{
  cors:{
    origin:'http://localhost:5173',
    credential:true,
  }
})

io.on('connection', (socket) => {
 console.log('connectid Socket');
 socket.on('message send', (data)=> {
   socket.broadcast.emit('recive message',data)
   console.log(data);
  })
 
}) 