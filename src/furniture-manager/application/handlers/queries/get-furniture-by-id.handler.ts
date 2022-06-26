import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";
import { DataSource } from "typeorm";
import { GetFurnitureManagerByIdDto } from "../../dtos/queries/get-furniture-manager-by-id.dto";
import { GetFurnitureManagerByIdQuery } from "../../queries/get-furniture-manager-by-id.query";

@QueryHandler(GetFurnitureManagerByIdQuery)
export class GetFurnitureManagerByIdHandler implements IQueryHandler<GetFurnitureManagerByIdQuery> {
    constructor(
        private _dataSource: DataSource
    ) {}
    async execute(query: GetFurnitureManagerByIdQuery): Promise<any> {
        const manager = this._dataSource.createEntityManager();
        const sql = 
        `
        SELECT *
        FROM furniture_managers
        WHERE id = ${query.id}
        ORDER BY name ASC
        `;
        const ormFurnitureManager = await this._dataSource.query(sql);
        if(!ormFurnitureManager)
            return null;
        const dtos: GetFurnitureManagerByIdDto[] = ormFurnitureManager.map(
            (ormFurnitureManager: FurnitureManagerTypeORM) => {
                const furnitureManagerDto: GetFurnitureManagerByIdDto = new GetFurnitureManagerByIdDto();
                furnitureManagerDto.id = ormFurnitureManager.id;
                furnitureManagerDto.name = ormFurnitureManager.name;
                return furnitureManagerDto;
            }
        );
        return dtos;
    }

}