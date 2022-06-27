import { SqlReader } from "node-sql-reader";
import { MigrationInterface, QueryRunner } from "typeorm"

export class FurnitureManagerSchema1656311603672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/furniture-manager-schema.sql';
        const queries = SqlReader.readSqlFile(path);
        for (const query of queries) {
          await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
