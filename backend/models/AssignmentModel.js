// models/AssignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
}, { timestamps: true });

const AssignmentModel = mongoose.model('Assignment', assignmentSchema);

module.exports = AssignmentModel;
