const Message = require("../module/messageSchema");
const Conversation = require('../module/conversationSchema');


const getMessages = async (req,res) => {
  try{
    const {id:userToChatId} = req.params;
    const senderId = req.userId;

    const conversation = await Conversation.findOne({
      participants: {$all:[senderId,userToChatId]}
    }).populate("messages");

    if(!conversation)return res.status(400).json([]);

    const messages = conversation.messages
  
    res.status(200).json(messages)
  }catch (error) {
    console.log('Error in getMessage Controller:', error.message);
    res.status(500).json({error:'Internal Server Error'});
  }
}


const sendMessage = async (req,res) => {
  try{
    const {message,senderId} = req.body;
    const {id: receiverId} = req.params;

    console.log('rec' + receiverId,senderId + 'send');
    
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId,receiverId] }
    });

    if(!conversation) {
      conversation = await Conversation.create({
        participants:[senderId,receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if(newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(),newMessage.save()])

    res.status(201).json(newMessage,receiverId,senderId);
  }catch (error) {
    console.log('Error in sendMessage Controller:', error?.message);
    res.status(500).json({error:'Internal Server Error'});
  }
}

module.exports = {
  sendMessage,
  getMessages,
};