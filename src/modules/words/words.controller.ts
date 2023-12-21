import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { FindAllWordDto } from './dto/find-all-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  findAll(@Query() query: FindAllWordDto) {
    return this.wordsService.findAll(query);
  }

  @Get('/count')
  getCounts() {
    return this.wordsService.getCountByTag();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }
}
