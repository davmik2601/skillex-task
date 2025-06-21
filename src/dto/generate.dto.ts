import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class GenerateDto {
  @IsNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  @ApiProperty({ type: 'number', isArray: true, example: [1, 2, 1] })
  items: number[];

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 2 })
  length: number;
}
