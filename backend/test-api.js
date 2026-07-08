const http = require('http');

async function testAPI() {
  try {
    const response = await fetch('http://localhost:4000/health');
    const data = await response.json();
    console.log('Health check:', data);
    
    const servicesResponse = await fetch('http://localhost:4000/api/v1/services');
    const servicesData = await servicesResponse.json();
    console.log('Services count:', servicesData.length || servicesData.services?.length);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
