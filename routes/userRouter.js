const express = require("express");
const userController = require("../controllers/userController");

const routes = (User) => {
  const userRouter = express.Router();

  const { getUsers, postUser, putUserById, deleteUserById } =
    userController(User);

  userRouter.route("/users").get(getUsers).post(postUser);

  userRouter.route("/users/:userId").put(putUserById).delete(deleteUserById);

  return userRouter;
};

module.exports = routes;
