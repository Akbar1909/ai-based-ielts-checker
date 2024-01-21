import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWordListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
