import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeCharForVarcharContacts1737314705154
  implements MigrationInterface
{
  name = 'ChangeCharForVarcharContacts1737314705154'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "email" character varying(50) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`)
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "phone" character varying(30) NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "phone"`)
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "phone" character(30) NOT NULL`,
    )
    await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "email"`)
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD "email" character(50) NOT NULL`,
    )
  }
}
