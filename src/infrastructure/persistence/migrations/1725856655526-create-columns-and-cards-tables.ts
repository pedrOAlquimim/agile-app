import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateColumnsAndCardsTables1725856655526
  implements MigrationInterface
{
  name = 'CreateColumnsAndCardsTables1725856655526'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cards" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "columnId" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "columns" ("id" SERIAL NOT NULL, "title" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "projectId" uuid, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "columns" ADD CONSTRAINT "FK_3f28d61a92b732bfb574c3b71a2" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "columns" DROP CONSTRAINT "FK_3f28d61a92b732bfb574c3b71a2"`,
    )
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_aba53d80092e2fffe0d70e641b7"`,
    )
    await queryRunner.query(`DROP TABLE "columns"`)
    await queryRunner.query(`DROP TABLE "cards"`)
  }
}
