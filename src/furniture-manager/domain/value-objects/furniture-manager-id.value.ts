export class FurnitureManagerId {
    private readonly _id: number;
    constructor(id: number) {
        this._id = id;
    }
    static create(id: number): FurnitureManagerId {
        return new FurnitureManagerId(id);
    }

    getValue(): number {
        return this._id;
    }
}