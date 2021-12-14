const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: {
    type: String,
    required: [true, "Ingrese un nombre valido."],
    match: [/^[a-zA-Z]+$/, "El nombre solo puede contener letras."],
  },
  lastName: {
    type: String,
    required: [true, "Ingrese un apellido valido."],
    match: [/^[a-zA-Z]+$/, "El apellido solo puede contener letras."],
  },
  userName: {
    type: String,
    lowercase: true,
    required: [true, "Ingrese un usuario valido."],
    match: [/^[a-zA-Z0-9]+$/, "El usuario solo puede tener letras y números."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Ingrese una contraseña valida."],
  },
  email: {
    type: String,
    required: [true, "Ingrese un email valido."],
    match: [/\S+@\S+\.\S+/, "El email debe tener un formato válido."],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Ingrese una dirección valida."],
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Ingrese un teléfono valido."],
    match: [/^[0-9]+$/, "El teléfono solo puede tener números."],
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userModel);
