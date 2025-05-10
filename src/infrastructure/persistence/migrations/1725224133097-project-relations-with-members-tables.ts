import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProjectRelationsWithMembersTables1725224133097
  implements MigrationInterface
{
  name = 'ProjectRelationsWithMembersTables1725224133097'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projectMembers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_59b3a6615675043fbc7619937c7" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "projectRoles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5af5c83a24610b490e9afa50619" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "projects_projectMembers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "projectMemberId" uuid, "projectId" uuid, "roleId" uuid, CONSTRAINT "PK_9e47fc22a9876b1edd946f3834b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" ADD CONSTRAINT "FK_c0434cb24147137dca9d1b2b23a" FOREIGN KEY ("projectMemberId") REFERENCES "projectMembers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" ADD CONSTRAINT "FK_3f0b9c1371e130feed7971d6d46" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" ADD CONSTRAINT "FK_1dcd71cc543c392dba1ce2b15e5" FOREIGN KEY ("roleId") REFERENCES "projectRoles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" DROP CONSTRAINT "FK_1dcd71cc543c392dba1ce2b15e5"`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" DROP CONSTRAINT "FK_3f0b9c1371e130feed7971d6d46"`,
    )
    await queryRunner.query(
      `ALTER TABLE "projects_projectMembers" DROP CONSTRAINT "FK_c0434cb24147137dca9d1b2b23a"`,
    )
    await queryRunner.query(`DROP TABLE "projects_projectMembers"`)
    await queryRunner.query(`DROP TABLE "projectRoles"`)
    await queryRunner.query(`DROP TABLE "projects"`)
    await queryRunner.query(`DROP TABLE "projectMembers"`)
  }
}
