/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Migration script for MySQL.
 * For now, we will only create a table called "combination" if it does not exist.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { createConnection } from 'mysql2/promise';

import { mysqlConfigOptions } from './database-config-options';

async function runMigrations() {
  const connection = await createConnection(mysqlConfigOptions);
  try {
    await connection.beginTransaction();

    /** create migrations table if it does not exist */

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS combination (
        id              SERIAL          PRIMARY KEY,
        createdAt       TIMESTAMP       NOT NULL DEFAULT NOW(),
        updatedAt       TIMESTAMP       NOT NULL DEFAULT NOW(),
        combinations    JSON            NOT NULL
      );
    `);

    await connection.commit();
    console.info('Migration script initialized successfully.');
  } catch (err) {
    await connection.rollback();
    console.error('Migration script initialization failed:', err);
    process.exit(1);
  } finally {
    connection.end();
  }
}

runMigrations().catch((err) => console.error(err));
