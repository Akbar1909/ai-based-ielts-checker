import { Module } from '@nestjs/common';
import { DefinitionsService } from './definitions.service';
import { DefinitionsController } from './definitions.controller';

@Module({
  controllers: [DefinitionsController],
  providers: [DefinitionsService],
})
export class DefinitionsModule {}
