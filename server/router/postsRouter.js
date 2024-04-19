const express = require("express");

const {
  create,
  getOne,
  getAll,
  update,
  delet,
  userPosts
} = require("../controllers/postsControler");

const verifyToken = require("../middlewares/verifyTiken");

const postsRouter = express.Router();

postsRouter.post("/", verifyToken, create);

postsRouter.get("/:id", getOne);

postsRouter.get("/", getAll);

postsRouter.patch("/:id", update);

postsRouter.delete("/:id", delet);

postsRouter.get("/user/:id", userPosts);

module.exports = postsRouter;
