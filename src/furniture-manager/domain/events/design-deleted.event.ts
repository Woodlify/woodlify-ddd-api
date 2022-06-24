import { Piece } from "src/furniture-design/domain/entities/piece.entity";

export class DeletedDesign {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly pieces: Piece[],
        public readonly designedDate: Date,
        public readonly lastModificationDate: Date
    ){}
}