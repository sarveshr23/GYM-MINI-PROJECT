const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    specialization: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
});

module.exports = mongoose.model('Trainer', trainerSchema);
