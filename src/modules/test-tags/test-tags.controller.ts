import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestTagsService } from './test-tags.service';
import { CreateTestTagDto } from './dto/create-test-tag.dto';
import { UpdateTestTagDto } from './dto/update-test-tag.dto';

@Controller('test-tags')
export class TestTagsController {
  constructor(private readonly testTagsService: TestTagsService) {}

  @Post()
  create(@Body() createTestTagDto: CreateTestTagDto) {
    return this.testTagsService.create(createTestTagDto);
  }

  @Get()
  findAll() {
    return this.testTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestTagDto: UpdateTestTagDto) {
    return this.testTagsService.update(+id, updateTestTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testTagsService.remove(+id);
  }
}
