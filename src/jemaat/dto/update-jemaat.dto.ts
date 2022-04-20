import { PartialType } from '@nestjs/mapped-types';
import { CreateJemaatDto } from './create-jemaat.dto';

export class UpdateJemaatDto extends PartialType(CreateJemaatDto) {}
