import { CanvasId } from "src/FurnitureDesign/domain/value-objects/canvas-id.value";

export class CreateDesignCommand {
    constructor(
        public readonly title: string,
        public readonly pieces: number[],
        public readonly designedDate: Date,
        public readonly lastModification: Date,
        public readonly canvasId: CanvasId
    ) {}
}