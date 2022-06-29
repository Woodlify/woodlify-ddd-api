import { ApiProperty } from "@nestjs/swagger";

export class RegisterCanvasRequest {
    @ApiProperty()
    public readonly name: string;
    @ApiProperty()
    public readonly createdAt: Date;
    @ApiProperty()
    public readonly lastModification:Date;
    constructor(
        name:string,
        createdAt:Date,
        lastModification:Date
    ) {
        this.name = name;
        this.createdAt = createdAt;
        this.lastModification = lastModification;
    }
}