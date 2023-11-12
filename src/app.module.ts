import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';
import { configuration, validationSchema } from './config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestGroupsModule } from './modules/test-groups/test-groups.module';
import { TestsModule } from './modules/tests/tests.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    UsersModule,
    TestGroupsModule,
    AuthModule,
    UploadModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TestGroupsModule,
    TestsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
