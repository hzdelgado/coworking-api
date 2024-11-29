# Proyecto: Sistema de Reservaciones de Espacios de Coworking

Descripción: Una aplicación web para reservar espacios de coworking o salas de reuniones, pueden verificar disponibilidad en tiempo real y realizar reservas. Incluye un buscador de reservas activas.

## Características

- **Gestión de espacios**: Listar y buscar espacios disponibles según filtros.
- **Gestión de reservaciones**: Crear y consultar reservaciones con validación de horarios.
- **PostgreSQL**: Base de datos para almacenar la información.
- **TypeORM**: ORM para la interacción con la base de datos.
- **NestJS**: Framework modular para desarrollo backend.

## Requisitos

Antes de iniciar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16+)
- [Yarn](https://yarnpkg.com/) o npm
- [PostgreSQL](https://www.postgresql.org/) (configurado y en funcionamiento)

## Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/hzdelgado/coworking-api.git
   cd coworking-api
   ```

2. **Configurar variables de entorno**:

   ```env
   # Configuración de la base de datos PostgreSQL
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=coworking
   ```
3. **Crear base de datos (con pgAdmin o psql)**:

   ```sql
   CREATE DATABASE coworking;
   ```

4. **Instalar dependencias y Ejecutar migraciones**:

   ```bash
   yarn install
   yarn run typeorm migration:run -d ./src/ormconfig.ts
   ```
## Despliegue
#### Modo Desarrollo
```env
yarn run start:dev
```
#### Modo Producción
```bash
yarn run build
yarn run start:prod
```
La API estará disponible en `http://localhost:3000`.
## Configuración del Proyecto
- `src/`: Contiene todo el código fuente.
- `src/modules/`: Módulos de la aplicación (por ejemplo, espacio y reservación).
- `src/migrations/`: Archivos de migración para la base de datos.
- `src/ormconfig.ts`: Configuración de TypeORM.

