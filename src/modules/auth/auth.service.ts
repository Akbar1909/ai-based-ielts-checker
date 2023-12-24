import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entity';
import { UserCreateDto } from '../users/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { getAutoFilledModelFields } from 'src/utils/autoFilledModelProperties';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: UserEntity['email']): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    return user;
  }

  async signin(dto: LoginDto) {
    const user: UserEntity = await this.validateUser(dto.email);

    if (!user) {
      throw new NotFoundException(
        `User with the provided ${dto.email} does not exist`,
      );
    }

    const isMatch = await this.comparePassword(dto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException({
        message: 'Provided password or email is incorrect',
      });
    }

    return this.getToken(user);
  }

  async signup(user: UserCreateDto) {
    const pre = await this.validateUser(user.email);

    if (pre) {
      throw new HttpException(
        {
          message: `User with the ${user.email} is already exist`,
        },
        HttpStatus.CONFLICT,
      );
    }

    const hash = await this.generateHash(user.password);
    const newUser = await this.prisma.user.create({
      data: { ...user, password: hash, ...getAutoFilledModelFields(true) },
    });

    return this.getToken(newUser);
  }

  async getToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateHash(password: UserEntity['password']) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async comparePassword(
    password: UserEntity['password'],
    hash: UserEntity['password'],
  ) {
    return await bcrypt.compare(password, hash);
  }

  async checkUsernameExist({ username }: Pick<UserEntity, 'username'>) {
    const record = await this.prisma.user.findFirst({ where: { username } });

    if (record) {
      throw new HttpException(
        { message: 'User already exist' },
        HttpStatus.CONFLICT,
      );
    }

    return {
      data: null,
      status: 'success',
    };
  }
}
