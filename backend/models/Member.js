const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: false },
    address: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    plan: { type: Object, required: true } // Or String/Schema depending on how you store plans
},{timestamps:true}
);


const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
