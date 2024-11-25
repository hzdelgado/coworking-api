import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
})
export class ReservationModule {}
