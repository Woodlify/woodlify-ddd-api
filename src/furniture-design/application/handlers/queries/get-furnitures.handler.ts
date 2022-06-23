import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource, EntityManager, getConnectionManager, getManager } from "typeorm";
import { GetFurnituresDto } from "../../dtos/queries/get-furnitures.dto";
import { GetFurnituresQuery } from "../../queries/get-furnitures.query";

@QueryHandler(GetFurnituresQuery)
export class GetFurnituresHandler implements IQueryHandler<GetFurnituresQuery> {
    constructor(private dataSource: DataSource) {}
    async execute(query: GetFurnituresQuery): Promise<any> {
        const manager = this.dataSource.createEntityManager();
        const sql = 
        `
        SELECT * 
        FROM furnitures
        ORDER BY name ASC;
        `;
        const ormFurnitures = await manager.query(sql);
        if(ormFurnitures.length <= 0)
            return [];
        const furnitures: GetFurnituresDto[] = ormFurnitures.map( ormFurnitures => {
            const furnitureDto = new GetFurnituresDto();
            furnitureDto.id = Number(ormFurnitures.id);
            furnitureDto.name = ormFurnitures.name;
            furnitureDto.designDate = ormFurnitures.designDate;
            furnitureDto.lastModificationDate = ormFurnitures.lastModificationDate;
            return furnitureDto;
        });
        return furnitures;
    }
}