import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { User } from 'src/decorators/user.decorator';
import { AuthEntity } from '../auth/auth.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createTestDto: CreateTestDto, @User() owner: AuthEntity) {
    return this.testsService.create(createTestDto, owner);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.testsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testsService.findOne(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testsService.update(+id, updateTestDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testsService.remove(+id);
  }
}
