const bookController = (Book) => {
  // GET book
  const getBooks = async (req, res) => {
    const { query } = req;
    const response = await Book.find(query);

    res.json(response);
  };

  // POST book
  const postBook = async (req, res) => {
    const book = new Book(req.body);

    await book.save();
    res.json(book);
  };

  // GET book by ID
  const getBookById = async (req, res) => {
    const { params } = req;
    const response = await Book.findById(params.bookId);

    res.json(response);
  };

  // PUT book by ID
  const putBookById = async (req, res) => {
    const { body } = req;
    const response = await Book.updateOne(
      {
        _id: req.params.bookId,
      },
      {
        $set: {
          title: body.title,
          author: body.author,
          genre: body.genre,
          read: body.read,
        },
      }
    );
    res.json(response);
  };

  // DELETE book by ID
  const deleteBookById = async (req, res) => {
    const id = req.params.bookId;

    await Book.findByIdAndDelete(id);
    res.status(202).json("The book has been deleted.");
  };

  return { getBooks, postBook, getBookById, putBookById, deleteBookById };
};

module.exports = bookController;
