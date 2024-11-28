import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EspacioService } from './espacio.service';
import { CreateEspacioDto } from 'src/dto/create-space-dto';

@Controller('espacios')
export class EspacioController {
  constructor(private readonly espacioService: EspacioService) {}

  /**
   * Endpoint para listar espacios disponibles.
   * @param nombre - Filtrar por nombre de sede.
   * @param capacidad - Filtrar por capacidad mínima.
   * @param hora - Verificar disponibilidad en una hora específica.
   */
  @Get('disponibles')
  async findAvailable(
    @Query('nombre') nombre?: string,
    @Query('capacidad') capacidad?: number,
    @Query('hora') hora?: string,
  ) {
    // Parsear hora si es proporcionada
    const parsedHora = hora ? new Date(hora) : undefined;

    return this.espacioService.findAvailable(nombre, capacidad, parsedHora);
  }

  @Post()
  async create(@Body() createEspacioDto: CreateEspacioDto) {
    return this.espacioService.create(createEspacioDto);
  }
}
