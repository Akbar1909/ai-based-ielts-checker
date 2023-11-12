import { PartialType } from '@nestjs/swagger';
import { CreateTestTagDto } from './create-test-tag.dto';

export class UpdateTestTagDto extends PartialType(CreateTestTagDto) {}
