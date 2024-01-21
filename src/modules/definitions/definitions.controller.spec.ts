import { Test, TestingModule } from '@nestjs/testing';
import { DefinitionsController } from './definitions.controller';
import { DefinitionsService } from './definitions.service';

describe('DefinitionsController', () => {
  let controller: DefinitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefinitionsController],
      providers: [DefinitionsService],
    }).compile();

    controller = module.get<DefinitionsController>(DefinitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
