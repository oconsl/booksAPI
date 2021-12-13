const express = require("express");
const booksController = require("../controllers/bookController");

const routes = (Book) => {
  const bookRouter = express.Router();

  const { getBooks, postBook, getBookById, putBookById, deleteBookById } =
    booksController(Book);

  bookRouter.route("/books").get(getBooks).post(postBook);

  bookRouter
    .route("/books/:bookId")
    .get(getBookById)
    .put(putBookById)
    .delete(deleteBookById);

  return bookRouter;
};

module.exports = routes;
