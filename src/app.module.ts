import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './global-filters/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';
import { configuration, validationSchema } from './config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { WordTagsModule } from './modules/word-tags/word-tags.module';
import { WordsModule } from './modules/words/words.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', '/uploads'),
    //   exclude: ['/api/(.*)'],
    // }),
    UsersModule,
    AuthModule,
    UploadModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    WordTagsModule,
    WordsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
