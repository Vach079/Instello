const {Post,Comment} = require("../module/postSchema");

const User = require("../module/userSchema");

const create = async (req, res) => {
  try {
    let { someInfo } = req.body;
    let path = req?.file?.path;
    someInfo = JSON.parse(someInfo);

    if (!path) {
      path = "";
    }
    const newPost = new Post({
      image: path,
      content: someInfo.content,
      user: req.userId,
    });

    const posts = await newPost.save();
    const user = await User.findByIdAndUpdate(req.userId, {
      posts: { $push: posts._id },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};



const getOne = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to create article",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({createdAt: -1}).populate('user').populate('comments');
    res.json(posts);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    let { someInfo } = req.body;
    let path = req?.file?.path;
    someInfo = JSON.parse(someInfo);

    if (!path) {
      path = "";
    }
    const updatePost = await Post.findByIdAndUpdate(req.params.id, {
      image: path,
      content: someInfo.content,
    });

    res.json(updatePost);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const userPosts = async (req,res) => {
  try{
    const posts = await Post.find({user:req.params.id});
    res.status(200).json(posts)
  }catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}

const delet = async (req, res) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to create article",
    });
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  userPosts,
  delet,
};
