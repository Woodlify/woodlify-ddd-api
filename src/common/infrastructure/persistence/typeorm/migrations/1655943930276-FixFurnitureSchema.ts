import { SqlReader } from "node-sql-reader";
import {MigrationInterface, QueryRunner} from "typeorm";

export class FixFurnitureSchema1655943930276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '\\fix-furniture-schema.sql';
        const queries = SqlReader.readSqlFile(path);
        for (const query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
