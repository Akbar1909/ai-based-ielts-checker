import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { WordLevelEnum } from '../entities/word.level';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  @IsNotEmpty()
  definition: string;

  @IsString()
  @IsNotEmpty()
  example: string;

  @IsString()
  partOfSpeech: string;

  @IsNumber()
  wordListId?: number;

  @IsEnum(WordLevelEnum)
  level?: WordLevelEnum;

  @IsString()
  @IsNotEmpty()
  dataUrl: string;

  @IsNumber()
  @IsNotEmpty()
  aspectRatio: number;
}
