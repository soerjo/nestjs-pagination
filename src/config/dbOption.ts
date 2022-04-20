import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { JemaatEntity } from 'src/jemaat/entities/jemaat.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class DbOption implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port: +process.env.SERVER_DB_PORT,
      username: process.env.SERVER_DB_USERNAME,
      password: process.env.SERVER_DB_PASSWORD,
      database: process.env.SERVER_DB_DATABASE,
      entities: [UserEntity, JemaatEntity],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
    };
  }
}
