import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { CanvasId } from "src/furniture-design/domain/value-objects/canvas-id.value";

export class ModifyDesignRequest {
    constructor (
        public readonly id: number,
        public readonly name: string,
        public readonly pieces: Piece[],
        public readonly designDate: Date,
        public readonly lastModificationDate: Date,
        public readonly canvasId: CanvasId
    ) {}
}