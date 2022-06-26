import { FurnitureState } from '../../../furniture-design/domain/enums/furnitureState.enum';

export class AcceptDesignCommand {
  constructor(
    public readonly furnitureDesignId: number,
    public readonly furnitureState: FurnitureState,
  ) {
    
  }
}