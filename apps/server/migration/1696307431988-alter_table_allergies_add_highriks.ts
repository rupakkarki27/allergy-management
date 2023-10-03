import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableAllergiesAddHighriks1696307431988 implements MigrationInterface {
    name = 'AlterTableAllergiesAddHighriks1696307431988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allergies" ADD "isHighRisk" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allergies" DROP COLUMN "isHighRisk"`);
    }

}
