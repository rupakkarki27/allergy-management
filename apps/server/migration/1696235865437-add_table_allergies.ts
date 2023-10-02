import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableAllergies1696235865437 implements MigrationInterface {
  name = 'AddTableAllergies1696235865437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."allergies_severity_enum" AS ENUM('MILD', 'MODERATE', 'SEVERE', 'LIFE THREATENING', 'DEATH')`,
    );
    await queryRunner.query(
      `CREATE TABLE "allergies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "name" character varying NOT NULL, "symptoms" text array NOT NULL, "severity" "public"."allergies_severity_enum" NOT NULL DEFAULT 'MILD', "image" character varying, "notes" character varying, CONSTRAINT "PK_f72e0cf363a832b8fa8cf657118" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`DROP TABLE "allergies"`);
    await queryRunner.query(`DROP TYPE "public"."allergies_severity_enum"`);
  }
}
