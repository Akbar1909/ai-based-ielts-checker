import { Module } from '@nestjs/common';
import { WordTagsService } from './word-tags.service';
import { WordTagsController } from './word-tags.controller';

@Module({
  controllers: [WordTagsController],
  providers: [WordTagsService],
})
export class WordTagsModule {}
