import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWordTagDto {
  @IsString()
  @IsNotEmpty()
  tag: string;
}
