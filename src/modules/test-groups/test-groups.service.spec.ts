import { Test, TestingModule } from '@nestjs/testing';
import { TestGroupsService } from './test-groups.service';

describe('TestGroupsService', () => {
  let service: TestGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestGroupsService],
    }).compile();

    service = module.get<TestGroupsService>(TestGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
