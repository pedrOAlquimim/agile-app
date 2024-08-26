import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateContactsTable1724630460124 implements MigrationInterface {
  name = 'CreateContactsTable1724630460124'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character(50) NOT NULL, "phone" character(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contacts"`)
  }
}
