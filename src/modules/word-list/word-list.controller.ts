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
import { WordListService } from './word-list.service';
import { CreateWordListDto } from './dto/create-word-list.dto';
import { UpdateWordListDto } from './dto/update-word-list.dto';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { JwtModel } from '../auth/models/jwt.model';
import { SaveDefinitionToWordList } from './dto/save-definition-to-word-list';

@UseGuards(AuthGuard)
@Controller('word-list')
export class WordListController {
  constructor(private readonly wordListService: WordListService) {}

  @Post()
  create(@Body() createWordListDto: CreateWordListDto, @User() me: JwtModel) {
    return this.wordListService.create(createWordListDto, me);
  }

  @Get()
  findAll() {
    return this.wordListService.findAll();
  }

  @Post('/save')
  saveWordToDefinition(@Body() dto: SaveDefinitionToWordList) {
    return this.wordListService.saveDefinition(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWordListDto: UpdateWordListDto,
  ) {
    return this.wordListService.update(+id, updateWordListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordListService.remove(+id);
  }
}
