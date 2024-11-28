import { Module } from '@nestjs/common';
import { Espacio } from './espacio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspacioController } from './espacio.controller';
import { EspacioService } from './espacio.service';
import { Reservacion } from 'src/reservacion/reservacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Espacio, Reservacion])],
  controllers: [EspacioController],
  providers: [EspacioService],
})
export class EspacioModule {}
