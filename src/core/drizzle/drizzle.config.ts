import 'dotenv/config';
import type { Config } from 'drizzle-kit';

// https://github.com/drizzle-team/drizzle-orm/issues/1583

// relative to project root
const schemaPath = 'src/core/schema/index.ts'; 

// relative to project root
const migrationsPath = 'src/core/drizzle/migrations'; 

export default {
  schema:  schemaPath, 
  out: migrationsPath,
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DB_CONNECTION!,
  }
} satisfies Config;