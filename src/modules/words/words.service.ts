import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';

@Injectable()
export class WordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWordDto: CreateWordDto) {
    const newRecord = await this.prisma.word.create({
      data: {
        ...createWordDto,
        ...getAutoFilledModelFields(true),
      },
    });
    return {
      status: 'success',
      data: newRecord,
    };
  }

  async findAll() {
    const records = await this.prisma.word.findMany({
      include: { wordTag: true, media: true },
    });

    return {
      status: 'success',
      data: records,
    };
  }

  async findOne(id: number) {
    const record = await this.prisma.word.findFirst({ where: { wordId: id } });
    return {
      status: 'success',
      data: record,
    };
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    let record = await this.prisma.word.delete({ where: { wordId: id } });

    if (!record) {
      throw new NotFoundException({
        message: `Word with the ${id} id not found`,
      });
    }

    record = await this.prisma.word.update({
      where: { wordId: id },
      data: {
        ...updateWordDto,
        ...getAutoFilledModelFields(),
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async remove(id: number) {
    await this.prisma.word.delete({ where: { wordId: id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
