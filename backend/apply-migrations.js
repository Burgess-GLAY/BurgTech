const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function applyMigrations() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully');

    const migrationsDir = path.join(__dirname, 'prisma', 'migrations');
    const migrationFolders = fs.readdirSync(migrationsDir)
      .filter(f => fs.statSync(path.join(migrationsDir, f)).isDirectory())
      .sort();

    console.log(`Found ${migrationFolders.length} migration folders`);

    for (const folder of migrationFolders) {
      const sqlFile = path.join(migrationsDir, folder, 'migration.sql');
      if (fs.existsSync(sqlFile)) {
        console.log(`Applying migration: ${folder}`);
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Split by semicolon and execute each statement
        const statements = sql.split(';').filter(s => s.trim());
        for (const statement of statements) {
          if (statement.trim()) {
            try {
              await prisma.$executeRawUnsafe(statement);
            } catch (e) {
              // Ignore errors for things that already exist
              if (!e.message.includes('already exists') && !e.message.includes('duplicate key')) {
                console.error('Error executing statement:', e.message);
              }
            }
          }
        }
        console.log(`Applied migration: ${folder}`);
      }
    }

    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

applyMigrations().catch(console.error);
