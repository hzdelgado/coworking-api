import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { Espacio } from './espacio.entity';
import { Reservacion } from '../reservacion/reservacion.entity';
import { CreateEspacioDto } from 'src/dto/create-space-dto';

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
    const queryBuilder = this.espacioRepository.createQueryBuilder('espacio')
      .leftJoinAndSelect('espacio.reservaciones', 'reservacion');
  
    // Agregar condición para buscar por nombre (usando ILIKE para búsqueda parcial)
    if (nombre) {
      queryBuilder.andWhere('espacio.nombre_sede ILIKE :nombre', { nombre: `%${nombre}%` });
    }
  
    // Agregar condición para capacidad
    if (capacidad) {
      queryBuilder.andWhere('espacio.capacidad <= :capacidad', { capacidad });
    }
  
    const espacios = await queryBuilder.getMany();
  
    if (!hora) {
      return espacios; // Si no se proporciona hora, devolver los espacios filtrados
    }
  
    // Filtrar espacios por conflictos de horario
    const espaciosDisponibles = [];
    for (const espacio of espacios) {
      const reservacionesEnHora = await this.reservacionRepository.findOne({
        where: {
          espacio: { id: espacio.id },
          horaReservacion: Between(
            new Date(hora),
            new Date(new Date(hora).getTime() + 60 * 60 * 1000) // +1 hora
          ),
        },
      });
  
      if (!reservacionesEnHora) {
        espaciosDisponibles.push(espacio);
      }
    }
  
    return espaciosDisponibles;
  }
  
  async create(createEspacioDto: CreateEspacioDto): Promise<Espacio> {
    const { nombreSede, capacidad } = createEspacioDto;
    // Creamos una nueva instancia de la entidad Espacio
    const nuevoEspacio = this.espacioRepository.create({
      nombreSede,
      capacidad
    });

    // Guardamos el nuevo espacio en la base de datos
    return await this.espacioRepository.save(nuevoEspacio);
  }

}
