const User = require("../module/userSchema");
const {Post} = require("../module/postSchema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body; //req.body.password and req.body.email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        "gsasgcht5698uhggvtfxtrds4e543267878890909jkjhbyfctdxeszruyuuiy"
      );
      res.json({
        token,
        user,
      });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const registration = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      login: req.body.login,
      password: hashedPassword,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
    await user.save();
    res.json({
      message: "User wac successfully created",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });

    res.status(200).json(user);
  } catch (err) {
    res.send(400).json({ message: err.message });
  }
};

const mainImageUpdate = async (req, res) => {
  try {
    let path = req?.file?.path;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        profilePicture: path,
      },
      { new: true }
    );
    if (!path) {
      path = "";
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      if(req.body.newPassword == req.body.repeatPassword){
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        const updatePasswords = await User.findByIdAndUpdate(req.params.id, {
          password: hashedPassword,
        });
      }
    }
    return res.json({
      message: "Update seccsesful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateLogEmNum = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id);
    const match = await bcrypt.compare(req.body.password, findUser.password);
    if (match) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          login: req.body.login.length > 4 ? req.body.login : findUser.login,
          phoneNumber:
            req.body.phoneNumber.length == 13
              ? req.body.phoneNumber
              : findUser.phoneNumber,
          email: req.body.email,
        },
        { new: true }
      );
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllUser = async (req,res) => {
  try{
    const user = await User.find();
    res.json(user)
  }catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

const delet = async (req, res) => {
  try {
    User.deleteOne({ _id: req.userId });
    Post.deleteMany({ user: req.userId });

    res.json({
      message: "User deleted with his all posts",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  login,
  registration,
  getProfile,
  mainImageUpdate,
  updatePassword,
  updateLogEmNum,
  getAllUser,
  delet,
};
