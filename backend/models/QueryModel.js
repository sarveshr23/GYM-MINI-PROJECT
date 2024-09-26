const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // Add phone number field
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
