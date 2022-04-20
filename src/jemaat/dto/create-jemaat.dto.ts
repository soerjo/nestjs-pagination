import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum JenisKelamin {
  PRIA = 'LAKI-LAKI',
  PEREMPUA = 'PEREMPUAN',
}

export class CreateJemaatDto {
  @IsString()
  @IsNotEmpty()
  nama_lengkap: string;

  @IsString()
  @IsNotEmpty()
  nama_panggilan: string;

  @IsInt()
  umur?: number;

  @IsString()
  @IsOptional()
  alamat?: string;

  @IsEnum(JenisKelamin, { message: 'must be "LAKI-LAKI" or "PEREMPUAN"' })
  jenis_kelamin: string;

  @IsString()
  @IsOptional()
  tempat_lahir?: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  tanggal_lahir: Date;
}
