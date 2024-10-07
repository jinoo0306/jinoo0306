import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Trip } from '../trips/trip.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trip, (trip) => trip.expenses) // 외래 키 설정
  trip: Trip;

  @Column('decimal')
  amount: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
