import { FurnitureState } from 'src/furniture-design/domain/enums/furnitureState.enum';
import { CanvasId } from 'src/furniture-design/domain/value-objects/canvas-id.value';

export class SubmitDesignRequest {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly status: FurnitureState
  ) {}
}