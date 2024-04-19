const { Post, Comment } = require("../module/postSchema");

const createComment = async (req, res) => {
  try {
    const comment = await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: { content: req.body.content, user: req.userId } },
    });
    res.send(comment);
  } catch (err) {
    console.log(err);
  }
};

const delet = async (req, res) => {
  try {
    const user = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { comments: { _id: req.params.commentId } } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createComment,
  delet,
};
