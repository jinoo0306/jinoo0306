import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
  ) {}

  async createTrip(tripData: Partial<Trip>): Promise<Trip> {
    const trip = this.tripsRepository.create(tripData);
    return await this.tripsRepository.save(trip);
  }

  async getAllTrips(): Promise<Trip[]> {
    return await this.tripsRepository.find({ where: { is_deleted: false } });
  }

  async updateTrip(id: number, tripData: Partial<Trip>): Promise<Trip> {
    await this.tripsRepository.update(id, tripData);
    const updatedTrip = await this.tripsRepository.findOne({
      where: { id }, // 수정된 부분
    });
    if (!updatedTrip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return updatedTrip;
  }

  async deleteTrip(id: number): Promise<void> {
    const result = await this.tripsRepository.update(id, { is_deleted: true });
    if (result.affected === 0) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }
}
