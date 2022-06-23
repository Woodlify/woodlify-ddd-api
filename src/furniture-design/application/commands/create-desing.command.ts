import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { CanvasId } from "src/furniture-design/domain/value-objects/canvas-id.value";

export class CreateDesignCommand {
    constructor(
        public readonly name: string,
        public readonly pieces: Piece[],
        public readonly designedDate: Date,
        public readonly lastModification: Date,
        public readonly canvasId: CanvasId
    ) {}
}