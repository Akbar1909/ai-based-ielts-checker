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
  Res,
  Body,
} from '@nestjs/common';
import { Express } from 'express';
import { UploadService } from './upload.service';
import LocalFilesInterceptor from 'src/interceptors/local-file.interceptor';
import { Observable, of } from 'rxjs';
import { UploadDataUrlDto } from './dto/upload-dataUrl.dto';

@Controller('files')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
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
  @Post('data-url')
  uploadDataUrl(
    @Body()
    uploadBodyDto: UploadDataUrlDto,
  ) {
    return this.uploadService.uploadDataUrl(uploadBodyDto);
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

  @Get('serve/:photoName')
  serverPhoto(
    @Param('photoName') photoName: string,
    @Res() res: any,
  ): Observable<object> {
    return of(res.sendFile(this.uploadService.buildFilepath(photoName)));
  }
}
