import { FurnitureState } from 'src/furniture-design/domain/enums/furnitureState.enum';
import { CanvasId } from 'src/furniture-design/domain/value-objects/canvas-id.value';

export class SubmitDesignResponse {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: FurnitureState,
    public readonly designedDate: Date,
    public readonly lastModification: Date,
    public readonly canvasId: CanvasId,
  ) {}
}