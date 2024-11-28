import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './reservacion.entity';
import { ReservacionController } from './reservacion.controller';
import { ReservacionService } from './reservacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacion])],
  controllers: [ReservacionController],
  providers: [ReservacionService],
})
export class ReservacionModule {}
