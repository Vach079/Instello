const express = require("express");

const {
  login,
  registration,
  getProfile,
  mainImageUpdate,
  updatePassword,
  updateLogEmNum,
  getAllUser,
  delet
} = require("../controllers/authControler");

const verifyToken = require("../middlewares/verifyTiken");

const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", registration);

authRouter.get("/get", verifyToken, getProfile);

authRouter.get('/',getAllUser);

authRouter.patch("/:id", mainImageUpdate);

authRouter.patch("/updatePass/:id", updatePassword);

authRouter.patch("/updateLogEmNum/:id", updateLogEmNum);

authRouter.delete("/:id", delet);


module.exports = authRouter;
