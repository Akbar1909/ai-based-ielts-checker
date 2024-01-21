import { PartialType } from '@nestjs/swagger';
import { CreateWordListDto } from './create-word-list.dto';

export class UpdateWordListDto extends PartialType(CreateWordListDto) {}
