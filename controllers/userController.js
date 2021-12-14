const userController = (User) => {
  // GET users
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
      console.log(error);
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

  // PUT user by ID
  const putUserById = async (req, res) => {
    try {
      const { body } = req;
      const user = new User(req.body);
      await user.save();
      const response = await User.updateOne(
        {
          _id: req.params.userId,
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            password: body.password,
            email: body.email,
            address: body.address,
            phone: body.phone,
          },
        }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
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

  // DELETE user by ID
  const deleteUserById = async (req, res) => {
    const id = req.params.userId;

    await User.findByIdAndDelete(id);
    res.status(202).json("The user has been deleted.");
  };

  return {
    getUsers,
    postUser,
    putUserById,
    deleteUserById,
  };
};

module.exports = userController;
