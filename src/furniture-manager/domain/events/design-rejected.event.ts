import { FurnitureState } from '../../../furniture-design/domain/enums/furnitureState.enum';

export class DesignRejectedEvent {
  constructor(
    public readonly furnitureDesignId: number,
    public furnitureState: FurnitureState,
  ) {}
}
