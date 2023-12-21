import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { UploadModule } from '../upload/upload.module';
import { WordTagsModule } from '../word-tags/word-tags.module';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [UploadModule, WordTagsModule],
})
export class WordsModule {}
