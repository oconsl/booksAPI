const express = require("express");
const userController = require("../controllers/userController");

const routes = (User) => {
  const userRouter = express.Router();

  const {
    getUsers,
    postUser,
    getUserById,
    getUserByLastName,
    putUserById,
    deleteUserById,
  } = userController(User);

  userRouter.route("/users").get(getUsers).post(postUser);

  userRouter
    .route("/users/:userId")
    .get(getUserById)
    .put(putUserById)
    .delete(deleteUserById);

  userRouter.route("/users/:userLastName").get(getUserByLastName);

  return userRouter;
};

module.exports = routes;
