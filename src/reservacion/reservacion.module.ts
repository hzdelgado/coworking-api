import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservacion } from './reservacion.entity';
import { ReservacionController } from './reservacion.controller';
import { ReservacionService } from './reservacion.service';
import { Espacio } from 'src/espacio/espacio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservacion]), TypeOrmModule.forFeature([Espacio])],
  controllers: [ReservacionController],
  providers: [ReservacionService],
})
export class ReservacionModule {}
