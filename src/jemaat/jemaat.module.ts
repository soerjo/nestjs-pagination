import { Module } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { JemaatController } from './jemaat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JemaatEntity } from './entities/jemaat.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JemaatEntity, UserEntity]), UserModule],
  controllers: [JemaatController],
  providers: [JemaatService],
  exports: [TypeOrmModule, JemaatService],
})
export class JemaatModule {}
