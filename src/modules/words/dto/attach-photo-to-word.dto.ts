import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AttachPhotoToWord {
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
  partOfSpeech: string;

  @IsNumber()
  @IsNotEmpty()
  mediaId: number;
}
