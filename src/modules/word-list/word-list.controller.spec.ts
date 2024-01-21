import { Test, TestingModule } from '@nestjs/testing';
import { WordListController } from './word-list.controller';
import { WordListService } from './word-list.service';

describe('WordListController', () => {
  let controller: WordListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordListController],
      providers: [WordListService],
    }).compile();

    controller = module.get<WordListController>(WordListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
