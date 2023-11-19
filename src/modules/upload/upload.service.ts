import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { PrismaService } from '../../prisma/prisma.service';
import { createUrlFromFile } from 'src/utils/createUrlFromFile';
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
    const media = await this.getFile(file.filename);

    const url = createUrlFromFile(media as any);

    console.log(media, this.buildFilepath(file.filename));

    const dbEntity = await this.prisma.assetLibrary.create({
      data: {
        filename: file.filename,
        filePath: this.buildFilepath(file.filename),
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      },
    });

    const response = {
      message: 'File uploaded successfully!',
      data: dbEntity,
    };
    return response;
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
}
