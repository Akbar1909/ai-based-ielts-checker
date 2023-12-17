import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { PrismaService } from '../../prisma/prisma.service';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';
import { UploadDataUrlDto } from './dto/upload-dataUrl.dto';
import { getCurrentTime } from 'src/utils/time';

('@nestjs/platform-express');

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const uploadedFiles = await this.prisma.assetLibrary.findMany({
      skip: 0,
      take: 10,
    });

    return uploadedFiles;
  }

  async upload(file: Express.Multer.File) {
    const dbEntity = await this.prisma.assetLibrary.create({
      data: {
        filename: file.filename,
        filePath: this.buildFilepath(file.filename),
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        ...getAutoFilledModelFields(true),
      },
    });

    const response = {
      message: 'File uploaded successfully!',
      data: dbEntity,
    };
    return response;
  }

  async uploadDataUrl({ dataUrl }: UploadDataUrlDto) {
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = dataUrl.match(regex);
    const ext = matches?.[1];
    const data = matches?.[2];
    const head = 'data:image/png;base64,';
    const fileSize = Math.round(((dataUrl.length - head.length) * 3) / 4);

    if (!ext || !data) {
      return {
        status: 'error',
        data: null,
      };
    }

    const buffer = Buffer.from(data, 'base64');
    const filename = `${getCurrentTime()}.${ext}`;
    const filePath = this.buildFilepath(filename);
    await fs.promises.writeFile(filePath, buffer);
    const mimetype = dataUrl.substring(
      dataUrl.indexOf(':') + 1,
      dataUrl.indexOf(';'),
    );

    const dbEntity = await this.prisma.assetLibrary.create({
      data: {
        filename,
        filePath,
        originalName: filename,
        size: fileSize,
        mimetype,
        ...getAutoFilledModelFields(true),
      },
    });

    return {
      message: 'File uploaded successfully',
      data: dbEntity,
    };
  }

  async findOne(id: number) {
    const dbEntity = await this.prisma.assetLibrary.findUnique({
      where: { mediaId: id },
    });

    if (!dbEntity) {
      throw new NotFoundException(`File with id: ${id} not found`);
    }

    return this.getFile(dbEntity.filename);
  }

  buildFilepath(filename: string) {
    return join(__dirname, '..', '..', '..', '..', '/uploads', filename);
  }

  async getFile(filename: string) {
    const file = await fs.promises.readFile(this.buildFilepath(filename));
    return file;
  }

  async deleteOne(id: number) {
    const file = await this.prisma.assetLibrary.findUnique({
      where: { mediaId: id },
    });

    if (!file) {
      throw new NotFoundException(`File with the id ${id} not found`);
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await this.prisma.assetLibrary.delete({ where: { mediaId: id } });
    return {
      status: 'success',
      data: null,
    };
  }

  async servePhoto(fileName: string) {
    const photoData = await this.getFile(fileName);

    const imageBuffer = Buffer.from(photoData as any, 'utf-8'); // Replace 'Your image buffer data' with your actual buffer data

    // Convert the buffer to a Base64-encoded string
    const base64Image = imageBuffer.toString('base64');
    const imgSrc = `data:image/png;base64,${base64Image}`;

    return imgSrc;
  }
  async serveDataUrl(fileName: string) {
    return await this.getFile(fileName);
  }
}
