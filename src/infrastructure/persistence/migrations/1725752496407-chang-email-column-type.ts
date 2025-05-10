import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangEmailColumnType1725752496407 implements MigrationInterface {
  name = 'ChangEmailColumnType1725752496407'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character NOT NULL`,
    )
  }
}
