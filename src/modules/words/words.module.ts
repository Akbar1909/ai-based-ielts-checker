import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [UploadModule],
})
export class WordsModule {}
