const http = require('http');

async function testAdminLogin() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'burgtechsolutions@gmail.com',
        password: 'CodeWithCarp!'
      })
    });
    const data = await response.json();
    console.log('Login response status:', response.status);
    console.log('Login response:', JSON.stringify(data, null, 2));
    
    if (data.token) {
      console.log('✅ JWT token received');
      
      // Test protected route with token
      const adminResponse = await fetch('http://localhost:4000/api/v1/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${data.token}` }
      });
      console.log('Admin dashboard status:', adminResponse.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAdminLogin();
