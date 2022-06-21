import { Furniture } from "../aggregates/furniture-design.entity";
import { CanvasId } from "../value-objects/canvas-id.value";
import { FurnitureId } from "../value-objects/furniture-id.value";

export class FurnitureFactory {
    public static createFrom(
        designDate: Date,
        lastModificationDate: Date,
        name: string,
        canvasId: CanvasId
    ): Furniture {
        return new Furniture(
            FurnitureId.create(0),
            designDate,
            lastModificationDate,
            name,
            canvasId
        );
    }

    public static createWIthId(
        id: FurnitureId,
        designDate: Date,
        lastModificationDate: Date,
        name: string,
        canvasId: CanvasId
    ): Furniture {
        return new Furniture(
            id,
            designDate,
            lastModificationDate,
            name,
            canvasId
        );
    }

}