import { Test, TestingModule } from '@nestjs/testing';
import { WordTagsService } from './word-tags.service';

describe('WordTagsService', () => {
  let service: WordTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordTagsService],
    }).compile();

    service = module.get<WordTagsService>(WordTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
