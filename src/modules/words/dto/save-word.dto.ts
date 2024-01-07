import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveWordDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsString()
  @IsNotEmpty()
  definition: string;

  @IsString()
  @IsOptional()
  example: string;

  @IsString()
  @IsOptional()
  partOfSpeech: string;
}
