const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json());
app.use(cors());

// Import the models
const RegisterModel = require('./models/RegisterModel');
const EquipmentModel = require('./models/EquipmentModel');
const QueryModel = require('./models/QueryModel');
const Member = require('./models/Member');
const AssignmentModel = require('./models/AssignmentModel');
const MembershipPlan = require('./models/MembershipPlan'); // Include the MembershipPlan model

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/GYM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.json({ message: 'success', role: user.role });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const registers = await RegisterModel.create(req.body);
    res.json(registers);
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(400).json({ error: err.message });
  }
});

// Fetch Users Route
app.get('/users', async (req, res) => {
  try {
    const users = await RegisterModel.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch User Count Route
app.get('/users/count', async (req, res) => {
  try {
    const count = await RegisterModel.countDocuments({ role: 'user' });
    res.json({ count });
  } catch (err) {
    console.error('Error counting users:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch Trainer Count Route
app.get('/trainers/count', async (req, res) => {
  try {
    const count = await RegisterModel.countDocuments({ role: 'trainer' });
    res.json({ count });
  } catch (err) {
    console.error('Error counting trainers:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch all trainers
app.get('/trainers', async (req, res) => {
  try {
    const trainers = await RegisterModel.find({ role: 'trainer' });
    res.json(trainers);
  } catch (err) {
    console.error('Error fetching trainers:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch specific trainer by ID
app.get('/trainers/:id', async (req, res) => {
  try {
    const trainer = await RegisterModel.findById(req.params.id).populate('users');
    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    console.error('Error fetching trainer:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add a new trainer
app.post('/trainers', async (req, res) => {
  try {
    const trainerData = { ...req.body, role: 'trainer' };
    const trainer = await RegisterModel.create(trainerData);
    res.json(trainer);
  } catch (err) {
    console.error('Error adding trainer:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update existing trainer
app.put('/trainers/:id', async (req, res) => {
  try {
    const trainerData = { ...req.body, role: 'trainer' };
    const updatedTrainer = await RegisterModel.findByIdAndUpdate(req.params.id, trainerData, { new: true });
    if (!updatedTrainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(updatedTrainer);
  } catch (err) {
    console.error('Error updating trainer:', err);
    res.status(400).json({ error: err.message });
  }
});

// Assign users to a trainer
app.put('/trainers/:id/assign-users', async (req, res) => {
  try {
    const trainerId = req.params.id;
    const { userIds } = req.body;

    const trainer = await RegisterModel.findByIdAndUpdate(
      trainerId,
      { $set: { users: userIds } },
      { new: true }
    ).populate('users'); // Use populate to get the user details

    if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
    res.json(trainer);
  } catch (err) {
    console.error('Error assigning users to trainer:', err);
    res.status(500).json({ error: err.message });
  }
});

// Equipment Management Routes

// Add new equipment
app.post('/equipment', async (req, res) => {
  try {
    const equipment = await EquipmentModel.create(req.body);
    res.json(equipment);
  } catch (err) {
    console.error('Error adding equipment:', err);
    res.status(400).json({ error: err.message });
  }
});

// Fetch all equipment
app.get('/equipment', async (req, res) => {
  try {
    const equipment = await EquipmentModel.find();
    res.json(equipment);
  } catch (err) {
    console.error('Error fetching equipment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch Equipment Count Route
app.get('/equipment/count', async (req, res) => {
  try {
    const count = await EquipmentModel.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting equipment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update equipment
app.put('/equipment/:id', async (req, res) => {
  try {
    const updatedEquipment = await EquipmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEquipment);
  } catch (err) {
    console.error('Error updating equipment:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete equipment
app.delete('/equipment/:id', async (req, res) => {
  try {
    await EquipmentModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error('Error deleting equipment:', err);
    res.status(400).json({ error: err.message });
  }
});

// Query Submission Route
app.post('/queries', async (req, res) => {
  try {
    const query = await QueryModel.create(req.body);
    res.json(query);
  } catch (err) {
    console.error('Error submitting query:', err);
    res.status(400).json({ error: err.message });
  }
});

// Fetch Queries Route
app.get('/queries', async (req, res) => {
  try {
    const queries = await QueryModel.find();
    res.json(queries);
  } catch (err) {
    console.error('Error fetching queries:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete query
app.delete('/queries/:id', async (req, res) => {
  try {
    await QueryModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Query deleted successfully' });
  } catch (err) {
    console.error('Error deleting query:', err);
    res.status(400).json({ error: err.message });
  }
});

// Add new member
app.post('/save-user-details', async (req, res) => {
  try {
    const { fullName, email, phone, dateOfBirth, height, weight, gender, address, emergencyContact, plan } = req.body;

    const newMember = new Member({
      fullName,
      email,
      phone,
      dateOfBirth,
      height,
      weight,
      gender,
      address,
      emergencyContact,
      plan
    });

    await newMember.save();
    res.status(200).send('User details saved successfully');
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).send('Error saving user details');
  }
});

// Fetch all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: err.message });
  }
});

// Fetch Member Count Route
app.get('/members/count', async (req, res) => {
  try {
    const count = await Member.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting members:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all membership plans
app.get('/api/membership-plans', async (req, res) => {
  try {
    const plans = await MembershipPlan.find(); // Fetch all membership plans
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans' });
  }
});

// Route to add a new membership plan
app.post('/api/membership-plans', async (req, res) => {
  try {
    const { title, price, benefits } = req.body;
    const newPlan = new MembershipPlan({ title, price, benefits }); // Create a new plan using the MembershipPlan model
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error adding plan' });
  }
});

// Route to update a membership plan
app.put('/api/membership-plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, benefits } = req.body;
    const updatedPlan = await MembershipPlan.findByIdAndUpdate(id, { title, price, benefits }, { new: true });
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan' });
  }
});

// Route to delete a membership plan
app.delete('/api/membership-plans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await MembershipPlan.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan' });
  }
});
// Delete a member
app.delete('/members/:id', async (req, res) => {
    try {
      await Member.findByIdAndDelete(req.params.id);
      res.json({ message: 'Member deleted successfully' });
    } catch (err) {
      console.error('Error deleting member:', err);
      res.status(400).json({ error: err.message });
    }
  });
  
  // Update a member
  app.put('/members/:id', async (req, res) => {
    try {
      const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedMember);
    } catch (err) {
      console.error('Error updating member:', err);
      res.status(400).json({ error: err.message });
    }
  });
  // Route to assign members to a trainer
app.post('/assignments', async (req, res) => {
  try {
      const { trainerId, memberIds } = req.body;
      const assignments = memberIds.map(memberId => ({
          trainerId,
          memberId
      }));
      await AssignmentModel.insertMany(assignments);
      res.status(201).json({ message: 'Members assigned successfully' });
  } catch (err) {
      console.error('Error assigning members:', err);
      res.status(400).json({ error: err.message });
  }
});

// Route to fetch assigned members for a trainer
app.get('/trainers/:id/assignments', async (req, res) => {
  try {
      const assignments = await AssignmentModel.find({ trainerId: req.params.id })
          .populate('memberId', 'fullName email'); // Populate with member details

      res.json(assignments); // This will include memberId populated with fullName and email
  } catch (err) {
      console.error('Error fetching assignments:', err);
      res.status(500).json({ error: err.message });
  }
});

// Fetch assigned members for a specific trainer
app.get('/trainers/:id/assignments', async (req, res) => {
  try {
      const trainer = await RegisterModel.findById(req.params.id).populate('users'); // Assuming 'users' is the field for assigned members
      if (!trainer) return res.status(404).json({ message: 'Trainer not found' });
      
      // Return the assigned members
      res.json(trainer.users);
  } catch (err) {
      console.error('Error fetching assigned members:', err);
      res.status(500).json({ error: err.message });
  }
});

  // Fetch a specific member by ID
app.get('/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error fetching member:', err);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
