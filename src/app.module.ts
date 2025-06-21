import { Module } from '@nestjs/common';

import { CombinationModule } from '@Src/modules/combination/combination.module';
import { DatabaseModule } from '@Database/database.module';

import { AppController } from './app.controller';

@Module({
  imports: [DatabaseModule, CombinationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
