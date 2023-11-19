import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  mediaId: number;
}
