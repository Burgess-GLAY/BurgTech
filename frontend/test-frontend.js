const http = require('http');

async function testFrontend() {
  try {
    const response = await fetch('http://localhost:3000');
    console.log('Frontend status:', response.status);
    const text = await response.text();
    console.log('Frontend HTML length:', text.length);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testFrontend();
