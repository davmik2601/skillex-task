import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

import { Combination } from '@Src/modules/combination/types/combination.model';

@Injectable()
export class CombinationRepository {
  protected readonly tableName = 'combination';

  constructor(@Inject('MYSQL_POOL') protected readonly pool: Pool) {}

  async insertAndReturn(combination: string[][]): Promise<Combination> {
    const [result] = await this.pool.execute(
      `INSERT INTO \`${this.tableName}\` (combinations) VALUES (?);`,
      [JSON.stringify(combination)],
    );

    const insertId = (result as any).insertId;

    const [rows] = await this.pool.execute(
      `SELECT * FROM \`${this.tableName}\` WHERE id = ? LIMIT 1;`,
      [insertId],
    );

    return rows[0];
  }
}
