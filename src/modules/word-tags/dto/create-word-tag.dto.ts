import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWordTagDto {
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsOptional()
  color: string;
}
