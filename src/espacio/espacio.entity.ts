import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservacion } from '../reservacion/reservacion.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Espacio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_sede'})
  @IsNotEmpty()
  nombreSede: string;

  @Column()
  @IsNotEmpty()
  capacidad: number;

  @OneToMany(() => Reservacion, (reservacion) => reservacion.espacio)
  reservaciones: Reservacion[];
}
