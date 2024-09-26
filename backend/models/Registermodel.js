const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  phone: {
    type: String,
    required: false // Make this required if necessary
  },
  specialization: {
    type: String,
    required: false // Make this required if necessary
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of User IDs
});

module.exports = mongoose.model('Register', RegisterSchema);
