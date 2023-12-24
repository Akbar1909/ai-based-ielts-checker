import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {}
  async create() {}
  update() {}
  delete() {}

  async findByEmail(email: UserEntity['email']) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
