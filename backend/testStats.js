const axios = require('axios');

(async () => {
  console.log('script started');
  try {
    const resp = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'password',
    });
    console.log('login response:', resp.data);

    const stats = await axios.get('http://localhost:5000/api/admin/stats', {
      headers: { Authorization: `Bearer ${resp.data.token}` },
    });
    console.log('stats response:', stats.data);
  } catch (err) {
    console.error('error', err.response ? err.response.data : err.message);
  }
  console.log('script finished');
})();