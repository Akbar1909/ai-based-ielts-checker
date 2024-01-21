import { Injectable } from '@nestjs/common';
import { CreateWordListDto } from './dto/create-word-list.dto';
import { UpdateWordListDto } from './dto/update-word-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';
import { JwtModel } from '../auth/models/jwt.model';
import { SaveDefinitionToWordList } from './dto/save-definition-to-word-list';
import { GetWordListWordsDto } from './dto/get-word-list-words.dto';

@Injectable()
export class WordListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWordListDto: CreateWordListDto, me: JwtModel) {
    const record = await this.prisma.wordList.create({
      data: {
        name: createWordListDto.name,
        userId: me.sub,
        ...getAutoFilledModelFields(true),
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async saveDefinition(dto: SaveDefinitionToWordList) {
    const record = await this.prisma.wordList.update({
      where: {
        wordListId: dto.wordListId,
      },
      data: {
        definitions: {
          connect: [{ definitionId: dto.definitionId }],
        },
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async getWordListWords({
    wordListId,
    page = 0,
    size = 100,
  }: GetWordListWordsDto) {
    const records = await this.prisma.wordList.findUnique({
      where: { wordListId },
      include: {
        definitions: {
          skip: page * size,
          take: size,
        },
      },
    });

    return {
      status: 'success',
      data: records,
    };
  }

  async findAll() {
    const records = await this.prisma.wordList.findMany();

    return {
      status: 'success',
      data: records,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} wordList`;
  }

  update(id: number, updateWordListDto: UpdateWordListDto) {
    return `This action updates a #${id} wordList`;
  }

  async remove(id: number) {
    await this.prisma.wordList.delete({ where: { wordListId: id } });

    return {
      status: 'success',
      data: null,
    };
  }
}
