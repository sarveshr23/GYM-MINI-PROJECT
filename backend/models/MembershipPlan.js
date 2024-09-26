const mongoose = require('mongoose');

// Define the schema for Membership Plans
const MembershipPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  benefits: {
    type: [String], // Array of strings for listing multiple benefits
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware to update 'updatedAt' before each save
MembershipPlanSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const MembershipPlan = mongoose.model('MembershipPlan', MembershipPlanSchema);

module.exports = MembershipPlan;
