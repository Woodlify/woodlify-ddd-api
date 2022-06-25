import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";

export class FurnitureManagerCreated {
    constructor (
        public readonly name: string,
        public readonly furnitures: FurnitureId[],
    ) {}
}