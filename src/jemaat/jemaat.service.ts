import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { JemaatEntity } from './entities/jemaat.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PageOptionsDto } from './dto/pageOptions.dto';
import { PageMetaDto } from './dto/pageMeta.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class JemaatService {
  private readonly logger = new Logger(JemaatService.name);

  constructor(
    @InjectRepository(JemaatEntity)
    private readonly jemaatRepo: Repository<JemaatEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async createJemaat(createJemaatDto: CreateJemaatDto) {
    console.log(createJemaatDto);
    try {
      const newJemaat = this.jemaatRepo.create(createJemaatDto);
      await this.jemaatRepo.save(newJemaat);

      const newUser = this.userRepo.create();
      newUser.jemaat = newJemaat;
      await this.userRepo.save(newUser);

      return { jemaat: newJemaat, user: newUser };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        this.logger.error(error);

        return error.message;
      }

      throw new InternalServerErrorException();
    }
  }

  async getJemaat(pageOptions: PageOptionsDto): Promise<PageDto<JemaatEntity>> {
    const queryBuilder = this.jemaatRepo.createQueryBuilder('jemaat');

    queryBuilder
      .orderBy('jemaat.createdAt', pageOptions.order)
      .skip(pageOptions.skip)
      .take(pageOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptions, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    return await this.jemaatRepo.findOne(id);
  }

  async update(id: string, updateJemaatDto: UpdateJemaatDto) {
    return await this.jemaatRepo.save({ ...updateJemaatDto, id });
  }

  async remove(id: string) {
    const jemaat = await this.findOne(id);
    try {
      await this.jemaatRepo.remove(jemaat);
      return true;
    } catch (error) {
      return error;
    }
  }
}
