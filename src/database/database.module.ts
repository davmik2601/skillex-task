import { Global, Logger, Module } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

import { mysqlConfigOptions } from '@Database/database-config-options';

@Global()
@Module({
  providers: [
    {
      provide: 'MYSQL_POOL',
      useFactory: async () => {
        const logger = new Logger('DatabaseModule');
        const pool: Pool = createPool({
          ...mysqlConfigOptions,
          connectionLimit: 20, // max clients' count
        });

        /** try to connect to the MySQL database */
        try {
          const conn = await pool.getConnection();
          await conn.ping();
          conn.release();
          logger.log('MySQL connected successfully.');
        } catch (err) {
          logger.error('MySQL connection failed.', err);
          throw err;
        }

        return pool;
      },
    },
  ],
  exports: ['MYSQL_POOL'],
})
export class DatabaseModule {}
