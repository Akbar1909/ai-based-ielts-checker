import { Test, TestingModule } from '@nestjs/testing';
import { WordTagsController } from './word-tags.controller';
import { WordTagsService } from './word-tags.service';

describe('WordTagsController', () => {
  let controller: WordTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordTagsController],
      providers: [WordTagsService],
    }).compile();

    controller = module.get<WordTagsController>(WordTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
