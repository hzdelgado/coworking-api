// create-espacio.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateEspacioDto {
  @IsString()
  nombreSede: string;

  @IsInt()
  capacidad: number;

}
