import { IsNotEmpty, IsString } from 'class-validator';

export class FindManyByWord {
  @IsString()
  @IsNotEmpty()
  word: string;
}
