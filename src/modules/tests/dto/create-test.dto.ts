import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTestDto {
  @IsNumber()
  testGroupId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  assets: number[];

  @IsArray()
  @IsString({ each: true })
  answers: [];
}
