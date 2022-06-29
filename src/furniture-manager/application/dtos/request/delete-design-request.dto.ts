import { ApiProperty } from "@nestjs/swagger";

export class DeleteDesignRequest {
    @ApiProperty()
    public readonly id: number;
    @ApiProperty()
    public readonly name: string;
    constructor(
        id: number,
        name: string
    ) {
        this.id;
        this.name = name;
    }
}