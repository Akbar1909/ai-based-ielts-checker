import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AuthEntity } from '../auth/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestEntity } from './entities/test.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { tags = [], assets = [], ...rest }: CreateTestDto,
    owner: AuthEntity,
  ) {
    const newRow = await this.prisma.test.create({
      data: {
        ...rest,
        authorId: +owner.userId,
        questionsCount: 0,
        assets: {
          connect: assets.map((asset) => ({ mediaId: asset })),
        },
        tags: {
          connect: tags.map((tag) => ({ testTagId: tag })),
        },
      },
    });

    return {
      status: 'success',
      data: newRow,
    };
  }

  findAll() {
    return `This action returns all tests`;
  }

  async findOne(id: number) {
    const testEntity = await this.findById(id, { testGroup: true });

    if (!testEntity) {
      throw new NotFoundException({
        message: `Test with provided ${id} not found`,
      });
    }

    return {
      status: 'success',
      data: testEntity,
    };
  }

  async update(id: number, { assets, tags, ...rest }: UpdateTestDto) {
    const waitedItem = await this.findById(id);

    if (!waitedItem) {
      throw new NotFoundException({
        message: `Test provide with id ${id} not found`,
      });
    }

    const updatedItem = await this.prisma.test.update({
      where: {
        testId: id,
      },
      data: {
        ...rest,
        assets: {
          connect: assets?.map((asset) => ({ mediaId: asset })),
        },
        tags: {
          connect: tags?.map((tag) => ({ testTagId: tag })),
        },
      },
    });

    return {
      status: 'success',
      data: updatedItem,
    };
  }

  async remove(id: number) {
    await this.prisma.test.delete({ where: { testId: id } });
    return {
      status: 'success',
      data: null,
    };
  }

  async findById(id: TestEntity['testId'], include: Prisma.TestInclude = {}) {
    return await this.prisma.test.findFirst({ where: { testId: id }, include });
  }
}
