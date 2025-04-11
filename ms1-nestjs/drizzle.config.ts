import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'ms1-mysql',
    user: 'admin',
    password: 'admin',
    port: 3306,
    database: 'ms1_db',
  },
});