import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetWordListWordsDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsNumber()
  @IsOptional()
  size: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  wordListId: number;
}
