import { Test, TestingModule } from '@nestjs/testing';
import { TestTagsService } from './test-tags.service';

describe('TestTagsService', () => {
  let service: TestTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestTagsService],
    }).compile();

    service = module.get<TestTagsService>(TestTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
