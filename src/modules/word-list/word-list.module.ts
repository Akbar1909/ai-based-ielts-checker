import { Module } from '@nestjs/common';
import { WordListService } from './word-list.service';
import { WordListController } from './word-list.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [WordListController],
  providers: [WordListService],
  imports: [JwtModule],
})
export class WordListModule {}
