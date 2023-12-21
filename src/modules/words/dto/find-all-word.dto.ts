import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindAllWordDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  size: number;
}
