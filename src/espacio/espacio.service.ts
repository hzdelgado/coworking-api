import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { Espacio } from './espacio.entity';
import { Reservacion } from '../reservacion/reservacion.entity';

@Injectable()
export class EspacioService {
  constructor(
    @InjectRepository(Espacio)
    private espacioRepository: Repository<Espacio>,
    @InjectRepository(Reservacion)
    private reservacionRepository: Repository<Reservacion>,
  ) {}

  /**
   * Listar espacios disponibles con filtros.
   * @param nombre - Filtrar por nombre de sede.
   * @param capacidad - Filtrar por capacidad mínima.
   * @param hora - Verificar disponibilidad en una hora específica.
   */
  async findAvailable(nombre?: string, capacidad?: number, hora?: Date) {
    const whereConditions: any = [];

    if (nombre) {
      whereConditions.push({ nombreSede: nombre });
    }
  
    if (capacidad) {
      whereConditions.push({ capacidad: LessThanOrEqual(capacidad) });
    }
  
    const espacios = await this.espacioRepository.find({
      where: whereConditions,
      relations: ['reservaciones'],
    });
  

    if (!hora) {
      return espacios; // Si no se proporciona hora, devolver todos los resultados filtrados
    }

    // Verificar conflictos de horario en reservaciones
    const espaciosDisponibles = [];

    for (const espacio of espacios) {
      const reservacionesEnHora = await this.reservacionRepository.findOne({
        where: {
          espacio: { id: espacio.id },
          horaReservacion: Between(
            new Date(hora),
            new Date(new Date(hora).getTime() + 60 * 60 * 1000), // +1 hora
          ),
        },
      });

      if (!reservacionesEnHora) {
        espaciosDisponibles.push(espacio);
      }
    }

    return espaciosDisponibles;
  }
}
