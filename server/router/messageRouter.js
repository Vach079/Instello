const express = require("express");
const verifyToken = require("../middlewares/verifyTiken");
const {sendMessage,getMessages} = require('../controllers/messageController');

const messageRouter = express.Router();

messageRouter.get("/:id",verifyToken,getMessages);
messageRouter.post("/send/:id",verifyToken,sendMessage);

module.exports = messageRouter;