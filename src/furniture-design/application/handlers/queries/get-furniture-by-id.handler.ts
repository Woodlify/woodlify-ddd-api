import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { GetFurnituresDto } from "../../dtos/queries/get-furnitures.dto";
import { GetFurnitureByIdQuery} from "../../queries/get-furniture-by-id.query"

@QueryHandler(GetFurnitureByIdQuery)
export class GetFurnituresByIdHandler implements IQueryHandler<GetFurnitureByIdQuery> {
    constructor(private dataSource:DataSource) {}
    async execute(query: GetFurnitureByIdQuery): Promise<any> {
        const manager = this.dataSource.createEntityManager();
        const sql = 
        `
        SELECT * 
        FROM furnitures
        WHERE id = ${query.id}
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