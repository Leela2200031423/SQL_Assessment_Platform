const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Assessment = require('./models/Assessment');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ciphersql');
  console.log('Connected to db');

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (!existing) {
    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash('password', 10);
    const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: hashed, role: 'admin' });
    console.log('Admin created', admin.id);
  } else {
    console.log('Admin already exists');
  }

  // add some assessments
  const count = await Assessment.countDocuments();
  if (count === 0) {
    await Assessment.create([
      { title: 'SELECT 1', description: 'Test', difficulty: 'Beginner', sqlQuery: 'SELECT 1', createdBy: existing? existing._id : null, totalSolved: 5 },
      { title: 'JOIN tables', description: 'Join test', difficulty: 'Intermediate', sqlQuery: 'SELECT * FROM a JOIN b', createdBy: existing? existing._id : null, totalSolved: 2 },
    ]);
    console.log('Added sample assessments');
  }

  mongoose.disconnect();
}

seed().catch(console.error);
