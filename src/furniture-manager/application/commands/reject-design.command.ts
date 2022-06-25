import { FurnitureState } from '../../../furniture-design/domain/enums/furnitureState.enum';

export class RejectDesignCommand {
  constructor(
    public readonly id: number,
    public readonly status: FurnitureState,
  ) {}
}
