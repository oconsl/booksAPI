const userController = (User) => {
  // GET user
  const getUsers = async (req, res) => {
    const { query } = req;
    const response = await User.find(query);

    res.json(response);
  };
  // POST user
  const postUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();

      res.json(user);
    } catch (error) {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(400).send(errors);
      }
      res.status(500).send("Ocurrió un error.");
    }
  };
  // GET user by ID
  const getUserById = async (req, res) => {
    const { params } = req;
    const response = await User.findById(params.userId);

    res.json(response);
  };
  // PUT user by ID
  const putUserById = async (req, res) => {
    const { body } = req;
    const response = await User.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          username: body.username,
          password: body.password,
          email: body.email,
          address: body.address,
          phone: body.phone,
        },
      }
    );
    res.json(response);
  };
  // DELET user by ID
  const deleteUserById = async (req, res) => {
    const id = req.params.userId;

    await User.findByIdAndDelete(id);
    res.status(202).json("The user has been deleted.");
  };
  // GET user by last name
  const getUserByLastName = async (req, res) => {
    const { params } = req;
    const response = await User.find({
      lastName: { $eq: params.userLastName },
    });

    res.json(response);
  };

  return {
    getUsers,
    postUser,
    getUserById,
    putUserById,
    deleteUserById,
    getUserByLastName,
  };
};

module.exports = userController;
