import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllDefinitionDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  size?: number;

  @IsNumber()
  @Type(() => Number)
  wordListId: number;
}
