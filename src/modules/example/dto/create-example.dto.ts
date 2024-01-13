import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  mediaId?: number[];
}
