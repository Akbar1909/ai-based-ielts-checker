import { PartialType } from '@nestjs/swagger';
import { CreateDefinitionDto } from './create-definition.dto';

export class UpdateDefinitionDto extends PartialType(CreateDefinitionDto) {}
