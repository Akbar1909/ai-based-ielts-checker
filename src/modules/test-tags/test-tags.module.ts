import { Module } from '@nestjs/common';
import { TestTagsService } from './test-tags.service';
import { TestTagsController } from './test-tags.controller';

@Module({
  controllers: [TestTagsController],
  providers: [TestTagsService],
})
export class TestTagsModule {}
