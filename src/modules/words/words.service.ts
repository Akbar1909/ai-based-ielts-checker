import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';
import { UploadService } from '../upload/upload.service';
import { FindAllWordDto, FindAllWordPartialDto } from './dto/find-all-word.dto';
import { AttachPhotoToWord } from './dto/attach-photo-to-word.dto';
import { FindManyByWord } from './dto/find-many-by-word.dto';
import { SaveWordDto } from './dto/save-word.dto';

@Injectable()
export class WordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async attachPhotoToWord({
    mediaId,
    example = '',
    ...rest
  }: AttachPhotoToWord) {
    const record = await this.prisma.word.create({
      data: {
        ...rest,
        example,
        images: {
          connect: [{ mediaId: mediaId }],
        },
        ...getAutoFilledModelFields(true),
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async save(dto: SaveWordDto) {
    const record = await this.prisma.word.create({
      data: { ...dto, ...getAutoFilledModelFields(true) },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async create({ dataUrl, aspectRatio, ...createWordDto }: CreateWordDto) {
    const { status, data: media } = await this.uploadService.uploadDataUrl({
      dataUrl,
      aspectRatio,
    });

    if (status !== 'success') {
      throw new NotFoundException({
        status: 'error',
        message: 'Error occurred in storing the image, Please retry 😊',
      });
    }

    const newRecord = await this.prisma.word.create({
      data: {
        ...createWordDto,
        mediaId: media?.mediaId,
        ...getAutoFilledModelFields(true),
      },
    });
    return {
      status: 'success',
      data: newRecord,
    };
  }

  async findAll({ page, size }: FindAllWordDto) {
    const config = {
      skip: page * size,
      take: size,
    };

    const [records, total] = await this.prisma.$transaction([
      this.prisma.word.findMany({
        ...config,
      }),
      this.prisma.word.count(),
    ]);

    return {
      status: 'success',
      data: {
        prev: page + 1 > 1 ? page - 1 : null,
        next: (page + 1) * size < total ? page + 1 : null,
        page,
        size,
        total,
        counts: records.length,
        records,
      },
    };
  }

  async findManyByWord({ word }: FindManyByWord) {
    const records = await this.prisma.word.findMany({
      where: { word },
      include: { images: { select: { filename: true } } },
    });

    return {
      status: 'success',
      data: records,
    };
  }

  async findWordsByWordTagIds({ wordTag }: FindAllWordPartialDto) {
    if (wordTag?.length === 0) {
      return {
        status: 'success',
        data: [],
      };
    }

    return {
      status: 'success',
      data: [],
    };
  }

  async getCountByTag() {
    return {
      status: 'success',
      data: [],
    };
  }

  async findOne(id: number) {
    const record = await this.prisma.word.findFirst({ where: { wordId: id } });
    return {
      status: 'success',
      data: record,
    };
  }

  async update(id: number, updateWordDto: UpdateWordDto) {
    let record = await this.prisma.word.delete({ where: { wordId: id } });

    if (!record) {
      throw new NotFoundException({
        message: `Word with the ${id} id not found`,
      });
    }

    record = await this.prisma.word.update({
      where: { wordId: id },
      data: {
        ...updateWordDto,
        ...getAutoFilledModelFields(),
      },
    });

    return {
      status: 'success',
      data: record,
    };
  }

  async remove(id: number) {
    await this.prisma.word.delete({ where: { wordId: id } });
    return {
      status: 'success',
      data: null,
    };
  }
}
