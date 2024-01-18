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
import { FindAllWordDto, FindAllWordPartialDto } from './dto/find-all-word.dto';
import { AttachPhotoToWord } from './dto/attach-photo-to-word.dto';
import { FindManyByWord } from './dto/find-many-by-word.dto';
import { SaveWordDto } from './dto/save-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  create(@Body() dto: { words: CreateWordDto[] }) {
    return this.wordsService.create(dto);
  }

  @Post('/attach-photo-to-word')
  attachPhotoToWord(@Body() dto: AttachPhotoToWord) {
    return this.wordsService.attachPhotoToWord(dto);
  }

  @Post('/save')
  save(@Body() dto: SaveWordDto) {
    return this.wordsService.save(dto);
  }

  @Get('/find-many-by-word')
  findManyByWord(@Query() query: FindManyByWord) {
    return this.wordsService.findManyByWord(query);
  }

  @Get('/search')
  search(@Query() query: { search: string }) {
    return this.wordsService.searchWord(query);
  }

  @Get()
  findAll(@Query() query: FindAllWordDto) {
    return this.wordsService.findAll(query);
  }

  @Get('/count')
  getCounts() {
    return this.wordsService.getCountByTag();
  }

  @Get('/word-tag')
  findAllByWordTagId(@Query() query: FindAllWordPartialDto) {
    return this.wordsService.findWordsByWordTagIds(query);
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
