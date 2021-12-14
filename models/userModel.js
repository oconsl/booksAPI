const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: {
    type: String,
    required: [true, "Por favor ingrese su nombre."],
    match: [/^[a-zA-Z]+$/, "El nombre solo puede contener letras."],
  },
  lastName: {
    type: String,
    required: [true, "Por favor ingrese su apellido."],
    match: [/^[a-zA-Z]+$/, "El apellido solo puede contener letras."],
  },
  userName: {
    type: String,
    lowercase: true,
    required: [true, "Por favor ingrese su usuario."],
    match: [/^[a-zA-Z0-9]+$/, "El usuario solo puede tener letras y números."],
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese una conraseña."],
    maxlength: [12, "La contraseña no debe tener más de 12 caracteres."],
    minlength: [6, "La contraseña debe tener más de 6 caracteres."],
  },
  email: {
    type: String,
    required: [true, "Por favor ingrese su email."],
    match: [/\S+@\S+\.\S+/, "El email debe tener un formato válido."],
    unique: true,
    sparse: true,
  },
  address: {
    type: String,
    required: [true, "Por favor ingrese su dirección."],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Por favor ingrese su teléfono."],
    match: [/^[0-9]+$/, "El teléfono solo puede tener números."],
    trim: true,
  },
});

module.exports = mongoose.model("User", userModel);
