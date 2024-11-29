import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Reservacion } from './reservacion.entity';
import { CreateReservacionDto } from '../dto/create-reservation-dto';
import { Espacio } from 'src/espacio/espacio.entity';
import { format } from 'date-fns';

@Injectable()
export class ReservacionService {
  constructor(
    @InjectRepository(Reservacion)
    private reservacionRepository: Repository<Reservacion>,
    @InjectRepository(Espacio)
    private espacioRepository: Repository<Espacio>,
  ) {}

  generarCodigoAlfanumerico(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres[randomIndex];
    }

    return codigo.toUpperCase();
  }
  // Método para crear una nueva reservación
  async create(
    createReservacionDto: CreateReservacionDto,
  ): Promise<Reservacion> {
    const { documentoIdentidad, horaReservacion, email, espacioId } =
      createReservacionDto;

    // Verificamos si el espacio existe
    const espacio = await this.espacioRepository.findOneBy({ id: espacioId });
    if (!espacio) {
      throw new HttpException('Espacio no encontrado', HttpStatus.BAD_REQUEST);
    }

    // Verificamos si ya existe una reservación en la misma hora para ese espacio
    const existingReservation = await this.reservacionRepository.findOne({
      where: {
        espacio: { id: espacio.id },
        horaReservacion: Between(
          new Date(horaReservacion),
          new Date(new Date(horaReservacion).getTime() + 60 * 60 * 1000), // +1 hora
        ),
      },
    });
    if (existingReservation) {
      throw new HttpException('Ya existe una reservación en esa hora para el espacio', HttpStatus.BAD_REQUEST);
    }

    const codigoReservacion = this.generarCodigoAlfanumerico(); // Generar código aquí

    // Creamos la nueva reservación
    const reservacion = this.reservacionRepository.create({
      documentoIdentidad,
      horaReservacion,
      espacio,
      email,
      codigoReservacion,
    });

    return this.reservacionRepository.save(reservacion);
  }

  async findByDocumentoIdentidad(
    documentoIdentidad: string,
  ): Promise<Reservacion> {
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

    if (!reservas.length) {
      throw new HttpException(
        'No se encontró ninguna reserva para este documento de identidad.', HttpStatus.BAD_REQUEST);
    }

    const reserva = reservas[0];
    const horaReservacion = new Date(reserva.horaReservacion);
    const now = new Date();

    // Validar si la reserva ha vencido
    if (horaReservacion < now) {
      throw new HttpException('La reserva ha vencido.', HttpStatus.BAD_REQUEST);
    }

    // Formatear la fecha
    reserva.horaReservacion = format(
      horaReservacion,
      'dd/MM/yyyy HH:mm:ss',
    ) as unknown as Date;

    // Retornar la reserva completa
    return reserva;
  }
}
