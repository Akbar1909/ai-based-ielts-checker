import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WordLevelEnum } from '../entities/word.level';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  example: string;

  @IsString()
  @IsOptional()
  partOfSpeech: string;

  @IsNumber()
  @IsOptional()
  mediaId: number;

  @IsNumber()
  @IsOptional()
  wordTagId?: number;

  @IsEnum(WordLevelEnum)
  @IsOptional()
  level?: WordLevelEnum;
}
