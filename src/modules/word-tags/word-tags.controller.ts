import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordTagsService } from './word-tags.service';
import { CreateWordTagDto } from './dto/create-word-tag.dto';
import { UpdateWordTagDto } from './dto/update-word-tag.dto';

@Controller('word-tags')
export class WordTagsController {
  constructor(private readonly wordTagsService: WordTagsService) {}

  @Post()
  create(@Body() createWordTagDto: CreateWordTagDto) {
    return this.wordTagsService.create(createWordTagDto);
  }

  @Get()
  findAll() {
    return this.wordTagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordTagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordTagDto: UpdateWordTagDto) {
    return this.wordTagsService.update(+id, updateWordTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordTagsService.remove(+id);
  }
}
