import { Test, TestingModule } from '@nestjs/testing';
import { TestGroupsController } from './test-groups.controller';
import { TestGroupsService } from './test-groups.service';

describe('TestGroupsController', () => {
  let controller: TestGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestGroupsController],
      providers: [TestGroupsService],
    }).compile();

    controller = module.get<TestGroupsController>(TestGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
