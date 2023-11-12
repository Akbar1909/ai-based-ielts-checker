import { PartialType } from '@nestjs/swagger';
import { CreateTestGroupDto } from './create-test-group.dto';

export class UpdateTestGroupDto extends PartialType(CreateTestGroupDto) {}
