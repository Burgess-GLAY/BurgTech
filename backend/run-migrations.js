const { execSync } = require('child_process');
const path = require('path');

console.log('Running Prisma migrations...');

try {
  const result = execSync('npx prisma migrate deploy', {
    cwd: path.join(__dirname),
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
