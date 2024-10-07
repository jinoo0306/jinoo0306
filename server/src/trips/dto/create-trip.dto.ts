import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ description: 'string', example: '여행 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '여행 시작 날짜', example: 'yyyy-mm-dd' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ description: '여행 종료 날짜', example: 'yyyy-mm-dd' })
  @IsDateString()
  end_date: Date;
}
