import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbOption } from './config/dbOption';
import { UserModule } from './user/user.module';
import { JemaatModule } from './jemaat/jemaat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DbOption,
    }),
    UserModule,
    JemaatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
