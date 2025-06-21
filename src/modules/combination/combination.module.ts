import { Module } from '@nestjs/common';

import { CombinationRepository } from '@Src/modules/combination/combination.repository';

import { CombinationService } from './combination.service';

@Module({
  providers: [CombinationRepository, CombinationService],
  exports: [CombinationService],
})
export class CombinationModule {}
