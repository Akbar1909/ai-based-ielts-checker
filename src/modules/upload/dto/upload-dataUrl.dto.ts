import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UploadDataUrlDto {
  @IsString()
  @IsNotEmpty()
  dataUrl: string;

  @IsNumber()
  @IsOptional()
  aspectRatio?: number;
}
