import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class UploadDataUrlDto {
  @IsString()
  @IsNotEmpty()
  dataUrl: string;
}
