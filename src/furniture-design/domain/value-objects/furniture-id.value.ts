import { ApiProperty } from "@nestjs/swagger";

export class FurnitureId {
    @ApiProperty()
    private readonly _id: number;
    constructor(id: number) {
        this._id = id;
    }
    static create(id: number): FurnitureId {
        return new FurnitureId(id);
    }
    getFurnitureId(): number {
        return this._id;
    } 
}