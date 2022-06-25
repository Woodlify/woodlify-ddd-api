import { FurnitureState } from '../../../furniture-design/domain/enums/furnitureState.enum';

export class PublishDesignCommand {
  constructor(
    public readonly furnitureDesignId: number,
    public readonly furnitureState: FurnitureState,
  ) {}
}
