import { Module } from '@nestjs/common';
import { TestGroupsService } from './test-groups.service';
import { TestGroupsController } from './test-groups.controller';

@Module({
  controllers: [TestGroupsController],
  providers: [TestGroupsService],
})
export class TestGroupsModule {}
