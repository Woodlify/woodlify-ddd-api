import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getManager } from "typeorm";
import { GetCanvasDto } from "../../dtos/queries/get-canvas.dto";
import { GetCanvasByIdQuery } from "../../queries/get-canvas-by-id.query";

@QueryHandler(GetCanvasDto)
export class GetCanvasByIdHandler implements IQueryHandler<GetCanvasByIdQuery> {

    constructor () {}

    async execute(query: GetCanvasByIdQuery): Promise<any> {
        const manager = getManager();
        const sql = 
        `
        SELECT * 
        FROM canvases
        WHERE id = ${query.id}
        ORDER BY name ASC;
        `;
        const ormCanvases = await manager.query(sql);
        if (ormCanvases.length <= 0)
            return [];
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