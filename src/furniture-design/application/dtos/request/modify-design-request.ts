import { ApiProperty } from "@nestjs/swagger";
import { Piece } from "src/furniture-design/domain/entities/piece.entity";
import { CanvasId } from "src/furniture-design/domain/value-objects/canvas-id.value";

export class ModifyDesignRequest {
    @ApiProperty()
    public readonly id: number;
    @ApiProperty()
    public readonly name: string;
    @ApiProperty()
    public readonly pieces: Piece[];
    @ApiProperty()
    public readonly designDate: Date;
    @ApiProperty()
    public readonly lastModificationDate: Date;
    @ApiProperty()
    public readonly canvasId: CanvasId;
    constructor (
        id: number,
        name: string,
        pieces: Piece[],
        designDate: Date,
        lastModificationDate: Date,
        canvasId: CanvasId
    ) {
        this.id = id;
        this.name = name;
        this.pieces = pieces;
        this.designDate = designDate;
        this.lastModificationDate = lastModificationDate;
        this.canvasId = canvasId;
    }
}