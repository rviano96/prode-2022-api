import { MigrationInterface, QueryRunner } from "typeorm";

export class initDb1668455151915 implements MigrationInterface {
    name = 'initDb1668455151915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stadium" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_c14b0495f7e40f2edfa6f0589d4" UNIQUE ("name"), CONSTRAINT "PK_e1fec3f13003877cd87a990655d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "acronym" character varying NOT NULL, "flag" character varying NOT NULL, "group" character varying NOT NULL, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "timeStart" TIMESTAMP WITH TIME ZONE NOT NULL, "result" character varying, "stage" character varying NOT NULL, "code" character varying NOT NULL, "homeGoals" integer, "awayGoals" integer, "awayTeamId" integer, "homeTeamId" integer, "stadiumId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "lastLoginAt" TIMESTAMP, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prediction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "homeGoals" integer, "awayGoals" integer, "userId" integer, "matchId" integer, CONSTRAINT "UQ_2e717c5ffeb6938ab8c1632c590" UNIQUE ("userId", "matchId"), CONSTRAINT "PK_23df2ceecea9f8bbb996ff056a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_07f5b02809e195be415834ed78a" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_5caac1768e2f5b7b9c69b62090c" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_9d7b332db52fc40a66a88447e15" FOREIGN KEY ("stadiumId") REFERENCES "stadium"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prediction" ADD CONSTRAINT "FK_2c2321258e9932737e9f9415e14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prediction" ADD CONSTRAINT "FK_947eb45d47c4f07c564480e45b0" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prediction" DROP CONSTRAINT "FK_947eb45d47c4f07c564480e45b0"`);
        await queryRunner.query(`ALTER TABLE "prediction" DROP CONSTRAINT "FK_2c2321258e9932737e9f9415e14"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_9d7b332db52fc40a66a88447e15"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_5caac1768e2f5b7b9c69b62090c"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_07f5b02809e195be415834ed78a"`);
        await queryRunner.query(`DROP TABLE "prediction"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "stadium"`);
    }

}
