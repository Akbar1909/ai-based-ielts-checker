import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordTagDto } from './dto/create-word-tag.dto';
import { UpdateWordTagDto } from './dto/update-word-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';

@Injectable()
export class WordTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWordTagDto: CreateWordTagDto) {
    const newWordTag = await this.prisma.wordTag.create({
      data: {
        ...createWordTagDto,
        ...getAutoFilledModelFields(true),
      },
    });
    return {
      status: 'success',
      data: newWordTag,
    };
  }

  async findAll() {
    const list = await this.prisma.wordTag.findMany();

    return {
      status: 'success',
      data: list,
    };
  }

  async findOne(wordTagId: number) {
    const item = await this.prisma.wordTag.findFirst({ where: { wordTagId } });

    return {
      status: 'success',
      data: item,
    };
  }

  async update(id: number, updateWordTagDto: UpdateWordTagDto) {
    let record = await this.prisma.wordTag.findFirst({
      where: { wordTagId: id },
    });

    if (!record) {
      throw new NotFoundException({
        message: `Record with provided ${id} not found`,
      });
    }

    record = await this.prisma.wordTag.update({
      where: { wordTagId: id, ...getAutoFilledModelFields() },
      data: updateWordTagDto,
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async remove(id: number) {
    await this.prisma.wordTag.delete({ where: { wordTagId: id } });

    return {
      status: 'success',
      data: null,
    };
  }
}
