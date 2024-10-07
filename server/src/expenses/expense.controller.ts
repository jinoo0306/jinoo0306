import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expense.service';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post(':trip_id')
  @ApiOperation({
    summary: 'Create an expense',
    description: '여행에 지출을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: 'The expense has been successfully created.',
  })
  createExpense(
    @Param('trip_id') tripId: number,
    @Body() createExpenseData: CreateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.createExpense(tripId, createExpenseData);
  }

  @Get(':trip_id')
  @ApiOperation({
    summary: 'Get all expenses',
    description: '모든 지출을 가져옵니다.',
  })
  getExpensesByTrip(
    @Param('trip_id') tripId: number,
    @Query('date') date?: string,
  ): Promise<Expense[]> {
    return this.expensesService.getExpensesByTrip(tripId, date);
  }

  @Put(':trip_id/:expense_id')
  @ApiOperation({
    summary: 'Update an expense',
    description: '여행의 지출을 수정합니다.',
  })
  updateExpense(
    @Param('trip_id') tripId: number,
    @Param('expense_id') expenseId: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expensesService.updateExpense(
      tripId,
      expenseId,
      updateExpenseDto,
    );
  }

  @Delete(':trip_id/:expense_id')
  @ApiOperation({
    summary: 'Delete an expense',
    description: '여행의 지출을 삭제합니다.',
  })
  deleteExpense(
    @Param('trip_id') tripId: number,
    @Param('expense_id') expenseId: number,
  ): Promise<void> {
    return this.expensesService.deleteExpense(tripId, expenseId);
  }
}
