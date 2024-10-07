import { IsNumber, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from './expense-category.enum';

export class CreateExpenseDto {
  @ApiProperty({ description: '지출 금액', example: 0 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: '지출 카테고리',
    example: ExpenseCategory.FOOD,
    enum: ExpenseCategory,
  })
  @IsEnum(ExpenseCategory, {
    message:
      'Category must be one of the predefined values(식비, 교통비, 숙박비, 오락비, 쇼핑, 의료비, 보험료, 선물, 기타)',
  })
  category: ExpenseCategory;

  @ApiProperty({ description: '지출 설명', example: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ description: '지출 날짜', example: 'yyyy-mm-dd' })
  @IsDateString()
  date: Date;
}
