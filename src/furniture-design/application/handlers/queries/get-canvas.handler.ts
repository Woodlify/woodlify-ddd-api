import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { GetCanvasDto } from "../../dtos/queries/get-canvas.dto";
import { GetCanvasQuery } from "../../queries/get-canvas.query";

@QueryHandler(GetCanvasDto)
export class GetCanvasHandler implements IQueryHandler<GetCanvasQuery> {

    constructor (private dataSource: DataSource) {}

    async execute(query: GetCanvasQuery): Promise<any> {
        const manager = this.dataSource.createEntityManager();
        const sql = 
        `
        SELECT * 
        FROM canvases
        ORDER BY name ASC;
        `;
        const ormCanvases = await manager.query(sql);
        if (ormCanvases.length <= 0)
            return  [];
        const canvases: GetCanvasDto[] = ormCanvases.map( ormCanvas => {
            const canvasDto = new GetCanvasDto();
            canvasDto.id = Number(ormCanvas.id);
            canvasDto.name = ormCanvas.name;
            canvasDto.createdAt = ormCanvas.createdAt;
            canvasDto.lastModification = ormCanvas.lastModification;
            return canvasDto;
        });
        return canvases;
    }
}