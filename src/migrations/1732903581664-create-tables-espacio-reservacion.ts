import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesEspacioReservacion1732903581664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE espacio (
                id SERIAL PRIMARY KEY,
                nombre_sede VARCHAR(100) NOT NULL,
                capacidad INT NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE reservacion (
                id SERIAL PRIMARY KEY,
                documento_identidad VARCHAR(20) NOT NULL,
                hora_reservacion TIMESTAMP NOT NULL,
                id_espacio INT NOT NULL,
                CONSTRAINT fk_espacio FOREIGN KEY (id_espacio) REFERENCES espacio (id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE reservacion;`);
        await queryRunner.query(`DROP TABLE espacio;`);
    }


}
