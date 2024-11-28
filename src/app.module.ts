import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Reservacion } from './reservacion/reservacion.entity';
import { Espacio } from './espacio/espacio.entity';
import { ReservacionModule } from './reservacion/reservacion.module';
import { EspacioModule } from './espacio/espacio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Reservacion, Espacio],
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}']  
      }),
    }),
    ReservacionModule,
    EspacioModule
  ],
})
export class AppModule {}
