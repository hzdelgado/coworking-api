import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReservacionService } from './reservacion.service';

@Controller('reservaciones')
export class ReservacionController {
  constructor(private readonly reservacionService: ReservacionService) {}

  // Endpoint para obtener reservaciones por número de documento de identidad
  @Get('documento/:documentoIdentidad')
  async getByDocumentoIdentidad(
    @Param('documentoIdentidad') documentoIdentidad: string,
  ) {
    return this.reservacionService.findByDocumentoIdentidad(documentoIdentidad);
  }

  @Post()
  create(@Body() data: any) {
    return this.reservacionService.create(data);
  }
}
