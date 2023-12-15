import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/one')
  findOne() {
    return 'only one';
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create() {
    return this.usersService.create();
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':userId')
  update() {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  delete() {
    return this.usersService.delete();
  }
}
