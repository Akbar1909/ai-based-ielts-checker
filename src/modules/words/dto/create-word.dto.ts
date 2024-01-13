import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateDefinitionDto } from 'src/modules/definition/dto/create-definition.dto';
import { Type } from 'class-transformer';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  word: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDefinitionDto)
  definitions: CreateDefinitionDto[];
}
