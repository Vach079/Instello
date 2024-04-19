const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login:{
    type:String,
    required:true,
    unique:true,
    minLength:4,
    maxLength :20,
    
  },
  password:{
    type:String,
    required:true,
    minLength:8, 
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  phoneNumber:{
    type:Number,
    required:true,
    unique:true,
  },
  bio:{
    type:String,
  },
  profilePicture:{
    type:String,
    default:''
  },
  followers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  }],
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
},{timestamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;