import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCorreoToReservation1732768171205 implements MigrationInterface {
    name = 'AddCorreoToReservation1732768171205';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "reservacion" ADD "email" character varying(255) NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservacion" DROP COLUMN "email"`);
    }

}
