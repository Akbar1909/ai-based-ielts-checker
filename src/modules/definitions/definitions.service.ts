import { Injectable } from '@nestjs/common';
import { CreateDefinitionDto } from './dto/create-definition.dto';
import { UpdateDefinitionDto } from './dto/update-definition.dto';
import { FindAllDefinitionDto } from './dto/find-all.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DefinitionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDefinitionDto: CreateDefinitionDto) {
    return 'This action adds a new definition';
  }

  async findAll({ page = 0, size = 100, wordListId }: FindAllDefinitionDto) {
    let records: any = await this.prisma.definition.findMany({
      skip: page * size,
      take: size,
      where: {
        wordListId: { in: [wordListId] },
      },
      select: {
        word: {
          select: {
            word: true,
            wordId: true,
          },
        },
        definition: true,
        partOfSpeech: true,
        definitionId: true,
      },
    });

    records = records.map((record: any) => ({ ...record, ...record.word }));

    return {
      list: records,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} definition`;
  }

  update(id: number, updateDefinitionDto: UpdateDefinitionDto) {
    return `This action updates a #${id} definition`;
  }

  remove(id: number) {
    return `This action removes a #${id} definition`;
  }
}
