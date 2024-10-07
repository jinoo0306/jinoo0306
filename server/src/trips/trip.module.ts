import { Module } from '@nestjs/common';
import { TripsService } from './trip.service';
import { TripsController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
