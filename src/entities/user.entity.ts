import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { Base } from './base.entity';
import { Prediction } from './prediction.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity()
@Unique(['email'])
export class User extends Base {

  @Column({ type: 'varchar' })
  email: string;

  //The exclude means that we're going to remove this prop 
  // from the response data

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  lastLoginAt: Date | null;

  @Column({ default: Role.USER })
  role: Role;

  @OneToMany(() => Prediction, (prediction) => prediction.userId)
  predictions: Prediction[]

}