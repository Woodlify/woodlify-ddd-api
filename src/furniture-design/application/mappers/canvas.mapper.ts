import { Canvas } from "src/furniture-design/domain/entities/canvas.entity";
import { CanvasTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/canvas.typeorm";

export class CanvasMapper {
    public static toTypeOrm(canvas: Canvas): CanvasTypeorm {
        const canvasTypeOrm: CanvasTypeorm = new CanvasTypeorm();
        canvasTypeOrm.createdAt = canvas.getCreatedAt();
        canvasTypeOrm.lastModification = canvas.getLastModification();
        canvasTypeOrm.name = canvas.getName();
        return canvasTypeOrm;
    }
}