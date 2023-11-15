import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { applyDefaultOrder } from '../utils/default-order';

@Injectable()
export class UsersService {
  constructor(protected readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    createUserDto.password = hashedPassword;

    return this.prismaService.users.create({
      data: createUserDto,
    });
  }

  findAll(): Promise<Users[]> {
    return this.prismaService.users.findMany({
      orderBy: applyDefaultOrder(),
    });
  }

  findOne(id: string): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    return this.prismaService.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string): Promise<Users> {
    return this.prismaService.users.delete({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
  }
}
