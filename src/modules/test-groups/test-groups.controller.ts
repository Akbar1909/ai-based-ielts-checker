import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TestGroupsService } from './test-groups.service';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthEntity } from '../auth/auth.entity';

@Controller('test-groups')
@UseGuards(JwtAuthGuard)
export class TestGroupsController {
  constructor(private readonly testGroupsService: TestGroupsService) {}

  @Post()
  create(
    @Body() createTestGroupDto: CreateTestGroupDto,
    @User() authEntity: AuthEntity,
  ) {
    return this.testGroupsService.create(createTestGroupDto, authEntity);
  }

  @Get()
  findAll() {
    return this.testGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestGroupDto: UpdateTestGroupDto,
  ) {
    // return this.testGroupsService.update(+id, updateTestGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testGroupsService.remove(+id);
  }
}
