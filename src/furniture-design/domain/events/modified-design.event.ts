import { Piece } from "../entities/piece.entity";
import { CanvasId } from "../value-objects/canvas-id.value";

export class ModifiedDesignEvent {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly pieces: Piece[],
        public readonly designDate: Date,
        public readonly canvasId: CanvasId
    ) {}
}