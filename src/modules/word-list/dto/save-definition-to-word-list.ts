import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveDefinitionToWordList {
  @IsNumber()
  @IsNotEmpty()
  definitionId: number;

  @IsNumber()
  @IsNotEmpty()
  wordListId: number;
}
