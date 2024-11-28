import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodigoReservacionRelation1732770135964 implements MigrationInterface {
    name = 'AddCodigoReservacionRelation1732770135964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservacion" ADD "codigo_reservacion" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservacion" DROP COLUMN "codigo_reservacion"`);
    }

}
