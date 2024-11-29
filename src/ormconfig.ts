import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Reservacion } from './reservacion/reservacion.entity';
import { Espacio } from './espacio/espacio.entity';
import { join } from 'path';


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  name: 'default',
  synchronize: false,
  entities: [Reservacion, Espacio, join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [
    join(__dirname, '/migrations/1732903581664-create-tables-espacio-reservacion.ts'),
    join(__dirname, '/migrations/*{.ts,.js}')
  ],
});
