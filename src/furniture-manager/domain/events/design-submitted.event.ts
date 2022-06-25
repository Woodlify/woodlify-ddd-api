import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { FurnitureState } from "src/furniture-design/domain/enums/furnitureState.enum";

export class DesignSubmittedEvent {
    constructor (
        public readonly id: number,
        public readonly name: string,
        public readonly state: FurnitureState,
        public readonly designedDate: Date,
        public readonly lastModificationDate: Date
    ) {}
}