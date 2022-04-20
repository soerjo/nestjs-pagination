import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JemaatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  nama_lengkap: string;

  @Column({ nullable: false })
  nama_panggilan: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'int', nullable: true })
  umur: number;

  @Column({ type: 'text', nullable: true })
  alamat: string;

  @Column({ default: 'LAKI-LAKI' })
  jenis_kelamin: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ type: 'date', nullable: false })
  tanggal_lahir: Date;

  @OneToOne(() => UserEntity, (user) => user.jemaat, { cascade: true })
  user: UserEntity;

  @BeforeInsert()
  toLowerCase() {
    this.nama_lengkap = this.nama_lengkap.toLowerCase();
    this.nama_panggilan = this.nama_panggilan.toLowerCase();
  }

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
