import { Test, TestingModule } from '@nestjs/testing';
import { TestTagsController } from './test-tags.controller';
import { TestTagsService } from './test-tags.service';

describe('TestTagsController', () => {
  let controller: TestTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestTagsController],
      providers: [TestTagsService],
    }).compile();

    controller = module.get<TestTagsController>(TestTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
