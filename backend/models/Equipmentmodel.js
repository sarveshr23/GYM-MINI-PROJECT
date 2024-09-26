const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, 'Quantity must be greater than 0'] 
  },
  price: { type: Number, required: true }
});

const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);

module.exports = EquipmentModel;
