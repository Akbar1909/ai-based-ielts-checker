import { Injectable } from '@nestjs/common';
import { CreateTestGroupDto } from './dto/create-test-group.dto';
// import { UpdateTestGroupDto } from './dto/update-test-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from '../auth/auth.entity';

@Injectable()
export class TestGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestGroupDto: CreateTestGroupDto, authEntity: AuthEntity) {
    const newTestGroup = await this.prisma.testGroup.create({
      data: { ...createTestGroupDto, authorId: +authEntity.userId },
    });

    return newTestGroup;
  }

  findAll() {
    return `This action returns all testGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testGroup`;
  }

  // update(id: number, updateTestGroupDto: UpdateTestGroupDto) {
  //   return `This action updates a #${id} testGroup`;
  // }

  remove(id: number) {
    return `This action removes a #${id} testGroup`;
  }
}
