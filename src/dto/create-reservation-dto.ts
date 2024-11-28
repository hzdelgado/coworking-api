import { IsString, IsDate, IsEmail, IsNumber } from 'class-validator';

export class CreateReservacionDto {
  @IsString()
  documentoIdentidad: string;

  @IsDate()
  horaReservacion: Date;

  @IsString()
  @IsEmail()
  email: string; // El nuevo campo que agregaste

  // Si necesitas más campos relacionados con la entidad Espacio
  // puedes agregar un campo para la relación ManyToOne
  // por ejemplo:
  @IsNumber()
  espacioId: number;
}
