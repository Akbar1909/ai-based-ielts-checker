import { PartialType } from '@nestjs/swagger';
import { CreateWordTagDto } from './create-word-tag.dto';

export class UpdateWordTagDto extends PartialType(CreateWordTagDto) {}
