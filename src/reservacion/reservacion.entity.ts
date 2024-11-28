import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Espacio } from '../espacio/espacio.entity';

@Entity()
export class Reservacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'documento_identidad'})
  documentoIdentidad: string;

  @Column({ name: 'hora_reservacion'})
  horaReservacion: Date;

  @ManyToOne(() => Espacio, (espacio) => espacio.reservaciones)
  @JoinColumn({ name: 'id_espacio' })
  espacio: Espacio;
}
