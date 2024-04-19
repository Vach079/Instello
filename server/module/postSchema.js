const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ 
  content: { 
    type: String, 
    required: true 
  }, 
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  } 
}); 


const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema], 
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = {
  Post:Post,
  Comment:Comment,
};
