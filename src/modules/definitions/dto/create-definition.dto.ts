import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateExampleDto } from 'src/modules/example/dto/create-example.dto';

export class CreateDefinitionDto {
  @IsString()
  @IsNotEmpty()
  definition: string;

  @IsString()
  @IsOptional()
  partOfSpeech?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExampleDto)
  examples: CreateExampleDto[];
}
