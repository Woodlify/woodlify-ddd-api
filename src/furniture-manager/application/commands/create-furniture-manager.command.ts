import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";

export class CreateFurnitureManagerCommand {
    constructor (
        public readonly id: number,
        public readonly name: string,
        public readonly furnitures: FurnitureId[],
    ) {}
}