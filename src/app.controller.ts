import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AppService } from './app.service';

@ApiTags('Global')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Will Redirect to the API Documentation (Swagger) ("/docs")',
  })
  baseEndpoint(@Res() res: Response): void {
    // redirecting to API documentation (Swagger)
    res.redirect(`/docs`);
  }
}
