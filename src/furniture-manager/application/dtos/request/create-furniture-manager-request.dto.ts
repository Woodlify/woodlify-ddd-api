import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";

export class CreateFurnitureManagerRequest {
    @ApiProperty()
    public readonly id: number;
    @ApiProperty()
    public readonly name: string;
    @ApiProperty()
    public readonly furnitures: FurnitureId[];
    constructor (
        id: number,
        name: string,
        furnitures: FurnitureId[],
    ) {
        this.id = id;
        this.name = name;
        this.furnitures = furnitures;
    }
}