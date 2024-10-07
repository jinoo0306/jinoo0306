import { Module } from '@nestjs/common';
import { ExpensesService } from './expense.service';
import { ExpensesController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { Trip } from '../trips/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Trip])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
