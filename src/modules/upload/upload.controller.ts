import {
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { Express } from 'express';
import { UploadService } from './upload.service';
import LocalFilesInterceptor from 'src/interceptors/local-file.interceptor';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(LocalFilesInterceptor({ fieldName: 'file', path: '' }))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              '.(png|docx|xlsx|pdf|text|log|jpg|png|exe|dll|sys|zip|rar|db|sqlite|jpeg)',
          }),
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.upload(file);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  readOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.uploadService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.uploadService.deleteOne(id);
  }
}
