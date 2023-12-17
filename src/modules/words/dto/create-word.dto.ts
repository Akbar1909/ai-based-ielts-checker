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
  partOfSpeech: string;

  @IsNumber()
  wordTagId?: number;

  @IsEnum(WordLevelEnum)
  level?: WordLevelEnum;

  @IsString()
  @IsNotEmpty()
  dataUrl: string;
}
