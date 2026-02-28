require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ciphersqlstudio');
    console.log('connected to Mongo');
    const user = await User.findOne({ email: 'testuser@example.com' });
    console.log('user lookup result:', user);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

main();