import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWordDto {
  @IsNumber()
  @IsNotEmpty()
  wordTagId: number;

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
  @IsNotEmpty()
  photoUrl: string;
}
