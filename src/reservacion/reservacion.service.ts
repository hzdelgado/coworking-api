import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Reservacion } from './reservacion.entity';
import { CreateReservacionDto } from '../dto/create-reservation-dto';
import { Espacio } from 'src/espacio/espacio.entity';

@Injectable()
export class ReservacionService {
  constructor(
    @InjectRepository(Reservacion)
    private reservacionRepository: Repository<Reservacion>,
    @InjectRepository(Espacio)
    private espacioRepository: Repository<Espacio>
  ) {}
  
  generarCodigoAlfanumerico(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[randomIndex];
    }
    
    return codigo.toUpperCase();
  }
  // Método para crear una nueva reservación
  async create(createReservacionDto: CreateReservacionDto): Promise<Reservacion> {
    const { documentoIdentidad, horaReservacion, email, espacioId } = createReservacionDto;

    // Verificamos si el espacio existe
    const espacio = await this.espacioRepository.findOneBy({ id: espacioId });
    if (!espacio) {
      throw new Error('Espacio no encontrado');
    }

    // Verificamos si ya existe una reservación en la misma hora para ese espacio
    const existingReservation = await this.reservacionRepository.findOne({
      where: {
        espacio: { id: espacio.id},
        horaReservacion: Between(
            new Date(horaReservacion),
            new Date(new Date(horaReservacion).getTime() + 60 * 60 * 1000), // +1 hora
          ),
      },
    });
    if (existingReservation) {
      throw new Error('Ya existe una reservación en esa hora para el espacio');
    }

    const codigoReservacion = this.generarCodigoAlfanumerico(); // Generar código aquí

    // Creamos la nueva reservación
    const reservacion = this.reservacionRepository.create({
      documentoIdentidad,
      horaReservacion,
      espacio,
      email,
      codigoReservacion
    });

    return this.reservacionRepository.save(reservacion);
  }

  // Método para obtener una reservación por el número de documento de identidad
  async findByDocumentoIdentidad(documentoIdentidad: string): Promise<Reservacion> {
    const reservas = await this.reservacionRepository.find({
      where: {
        documentoIdentidad,
      },
      relations: ['espacio'], // Incluye la relación con espacio
      order: {
        horaReservacion: 'DESC', // Ordena por la hora de la reservación de forma descendente
      },
      take: 1, // Limita el resultado a la reserva más reciente
    });
  
    // Retorna la primera reserva de la lista (la más reciente)
    return reservas[0];
  }  

}
