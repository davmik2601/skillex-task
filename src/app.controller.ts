import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { GenerateDto } from '@Src/dto/generate.dto';
import { CombinationService } from '@Src/modules/combination/combination.service';
import { Combination } from '@Src/modules/combination/types/combination.model';

@ApiTags('Global')
@Controller()
export class AppController {
  constructor(private readonly combinationService: CombinationService) {}

  @Get('/')
  @ApiOperation({ summary: 'Will Redirect to the API Docs (Swagger) (/docs)' })
  baseEndpoint(@Res() res: Response): void {
    // redirecting to API documentation (Swagger)
    res.redirect(`/docs`);
  }

  //
  //
  // test-task endpoint. (generate combinations)
  // -------------------------------------------------------------------
  @Post('/generate')
  @ApiOperation({ summary: 'Generate The Combinations' })
  generate(@Body() data: GenerateDto): Promise<Combination> {
    return this.combinationService.generate(data);
  }
  // -------------------------------------------------------------------
}
