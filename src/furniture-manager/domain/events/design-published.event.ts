import { FurnitureState } from '../../../furniture-design/domain/enums/furnitureState.enum';

export class DesignPublishedEvent {
  constructor(
    public readonly furnitureDesignId: number,
    public readonly furnitureState: FurnitureState,
  ) {}
}
