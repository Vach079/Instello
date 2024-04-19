const express = require("express");
const verifyToken = require("../middlewares/verifyTiken");
const {createComment,delet} = require('../controllers/commentControler')

const comentRouter = express.Router();

comentRouter.post("/:id",verifyToken,createComment);

comentRouter.patch("/:id/:commentId",delet);
 
module.exports = comentRouter;
