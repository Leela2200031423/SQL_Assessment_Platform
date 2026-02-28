const axios = require('axios');

async function run() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'MongoTester',
      email: 'mongouser@example.com',
      password: 'Password123'
    });
    console.log('response data', res.data);
  } catch (err) {
    console.error('error', err.response ? err.response.data : err.message);
  }
}

run();