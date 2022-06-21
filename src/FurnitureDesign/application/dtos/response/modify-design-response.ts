import { Piece } from "src/FurnitureDesign/domain/entities/piece.entity";
import { CanvasId } from "src/FurnitureDesign/domain/value-objects/canvas-id.value";

export class ModifyDesignResponse {
    constructor (
        public readonly id: number,
        public readonly name: string,
        public readonly pieces: Piece[],
        public readonly designDate: Date,
        public readonly lastModificationDate: Date,
        public readonly canvasId: CanvasId
    ) {}
}