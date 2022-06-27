import { Canvas } from "src/furniture-design/domain/entities/canvas.entity";
import { CanvasTypeORM } from "src/furniture-design/infrastructure/persistence/typeorm/entities/canvas.typeorm";

export class CanvasMapper {
    public static toTypeOrm(canvas: Canvas): CanvasTypeORM {
        const canvasTypeOrm: CanvasTypeORM = new CanvasTypeORM();
        canvasTypeOrm.createdAt = canvas.getCreatedAt();
        canvasTypeOrm.lastModification = canvas.getLastModification();
        canvasTypeOrm.name = canvas.getName();
        return canvasTypeOrm;
    }
}