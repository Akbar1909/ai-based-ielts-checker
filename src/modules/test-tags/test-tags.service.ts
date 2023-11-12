import { Injectable } from '@nestjs/common';
import { CreateTestTagDto } from './dto/create-test-tag.dto';
import { UpdateTestTagDto } from './dto/update-test-tag.dto';

@Injectable()
export class TestTagsService {
  create(createTestTagDto: CreateTestTagDto) {
    return 'This action adds a new testTag';
  }

  findAll() {
    return `This action returns all testTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testTag`;
  }

  update(id: number, updateTestTagDto: UpdateTestTagDto) {
    return `This action updates a #${id} testTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} testTag`;
  }
}
