import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class FindAllWordDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  size: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  wordTag: number[];
}

export class FindAllWordPartialDto extends PartialType(FindAllWordDto) {}
