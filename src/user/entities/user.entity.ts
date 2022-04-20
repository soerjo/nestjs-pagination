import * as moment from 'moment';
import { hashSync, genSaltSync } from 'bcrypt';

import { JemaatEntity } from 'src/jemaat/entities/jemaat.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum Role {
  JEMAAT = 'JEMAAT',
  PELAYAN = 'PELAYAN',
  PEMBIMBING = 'PEMBIMBING',
  PEKERJA = 'PEKERJA',
  LEADER = 'LEADER',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ default: Role.JEMAAT })
  role: Role;

  @Column({ select: false })
  password: string;

  @OneToOne(() => JemaatEntity, (Jemaat) => Jemaat.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  jemaat: JemaatEntity;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @BeforeInsert()
  toLowerCase() {
    this.email = this.email?.toLowerCase();
  }

  @BeforeInsert()
  generateDefaultPassword() {
    if (!this.password) {
      const getDateFormat = moment(this.jemaat.tanggal_lahir).format('DDMMYY');
      this.password = hashSync(getDateFormat, genSaltSync());
    }
  }
}
