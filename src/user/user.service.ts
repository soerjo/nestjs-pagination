import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    const queryBuilder = this.userRepo.createQueryBuilder('user');

    queryBuilder
      .leftJoin('user.jemaat', 'jemaat')
      .addSelect(['jemaat.nama_lengkap'])
      .addSelect('user.password')
      .where('user.id = :id', { id });

    return await queryBuilder.getOne();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, nama_lengkap } = createUserDto;
    const queryBuilder = this.userRepo.createQueryBuilder('user');

    queryBuilder
      .leftJoin('user.jemaat', 'jemaat')
      .addSelect(['jemaat.nama_lengkap', 'jemaat.email'])
      .where('jemaat.nama_lengkap = :nama_lengkap', { nama_lengkap });

    let user = await queryBuilder.getOne();
    if (!user) return 'user cannot created, must be registerd as jemaat from admin';

    if (password) user.password = hashSync(password, genSaltSync());
    user.email = email;
    user.jemaat.email = email;

    return await this.userRepo.save({ ...user });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
