const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Checking database connection...');
    await prisma.$connect();
    console.log('Connected to database successfully');
    
    console.log('Checking if Service table exists...');
    const services = await prisma.service.findMany();
    console.log(`Found ${services.length} services`);
    
    console.log('Checking if User table exists...');
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users`);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Code:', error.code);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
