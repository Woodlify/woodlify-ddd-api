import { Piece } from "src/FurnitureDesign/domain/entities/piece.entity";
import { CanvasId } from "src/FurnitureDesign/domain/value-objects/canvas-id.value";

export class CreateDesignCommand {
    constructor(
        public readonly name: string,
        public readonly pieces: Piece[],
        public readonly designedDate: Date,
        public readonly lastModification: Date,
        public readonly canvasId: CanvasId
    ) {}
}