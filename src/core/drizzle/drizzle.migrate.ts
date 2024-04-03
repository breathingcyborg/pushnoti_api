import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import config from './drizzle.config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// This will run migrations on the database, skipping the ones already applied
async function main() {
    const migrationClient = postgres(config.dbCredentials.connectionString, {
       max: 1 
    });

    const db = drizzle(migrationClient);

    await migrate(db, { migrationsFolder: config.out });

    await migrationClient.end();
}

main();