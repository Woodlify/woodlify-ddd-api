import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";
import { DataSource } from "typeorm";
import { GetFurnitureManagerDto } from "../../dtos/queries/get-furniture-manager.dto";
import { GetFurnitureManagerQuery } from "../../queries/get-furniture-manager.query";

@QueryHandler(GetFurnitureManagerQuery)
export class GetFurnitureManagerHandler implements IQueryHandler<GetFurnitureManagerQuery> {
    constructor(
        private _dataSource: DataSource
    ) {}
    async execute(query: GetFurnitureManagerQuery): Promise<any> {
        const manager = this._dataSource.createEntityManager();
        const sql = 
        `
        SELECT *
        FROM furniture_managers
        `;
        const ormFurnitureManagers = await this._dataSource.query(sql);
        if(!ormFurnitureManagers)
            return [];
        const dtos: GetFurnitureManagerDto[] = ormFurnitureManagers.map(
            (ormFurnitureManager: FurnitureManagerTypeORM) => {
                const furnitureManagerDto: GetFurnitureManagerDto = new GetFurnitureManagerDto();
                furnitureManagerDto.name = ormFurnitureManager.name
                return furnitureManagerDto;
            }
        );
        return dtos;
    }

}