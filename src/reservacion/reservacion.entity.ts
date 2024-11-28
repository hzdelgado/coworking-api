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


  // Nuevo campo "email"
  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'codigo_reservacion', type: 'varchar', length: 255, nullable: false })
  codigoReservacion: string;

}
