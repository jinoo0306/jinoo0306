import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { Trip } from '../trips/trip.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {}

  async createExpense(
    tripId: number,
    expenseData: Partial<Expense>,
  ): Promise<Expense> {
    // findOne의 수정된 부분: where 옵션 사용
    const trip = await this.tripsRepository.findOne({
      where: { id: tripId },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }
    const expense = this.expensesRepository.create({ ...expenseData, trip });
    return await this.expensesRepository.save(expense);
  }

  async getExpensesByTrip(tripId: number, date?: string): Promise<Expense[]> {
    const query = this.expensesRepository
      .createQueryBuilder('expense')
      .where('expense.tripId = :tripId', { tripId })
      .andWhere('expense.is_deleted = false');

    if (date) {
      query.andWhere('expense.date = :date', { date });
    }

    return await query.getMany();
  }

  async updateExpense(
    tripId: number,
    expenseId: number,
    expenseData: Partial<Expense>,
  ): Promise<Expense> {
    // findOne의 수정된 부분: where 옵션 사용
    const expense = await this.expensesRepository.findOne({
      where: { id: expenseId, trip: { id: tripId } },
    });
    if (!expense) {
      throw new NotFoundException(
        `Expense with ID ${expenseId} not found for Trip ID ${tripId}`,
      );
    }
    Object.assign(expense, expenseData);
    return await this.expensesRepository.save(expense);
  }

  async deleteExpense(tripId: number, expenseId: number): Promise<void> {
    // update 메서드에는 수정할 대상의 조건과 업데이트할 필드를 제공
    const result = await this.expensesRepository.update(
      { id: expenseId, trip: { id: tripId } },
      { is_deleted: true },
    );
    if (result.affected === 0) {
      throw new NotFoundException(
        `Expense with ID ${expenseId} not found for Trip ID ${tripId}`,
      );
    }
  }
}
