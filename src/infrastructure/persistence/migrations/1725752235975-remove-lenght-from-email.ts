import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveLenghtFromEmail1725752235975 implements MigrationInterface {
  name = 'RemoveLenghtFromEmail1725752235975'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character(50) NOT NULL`,
    )
  }
}
