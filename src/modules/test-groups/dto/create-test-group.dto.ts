import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
