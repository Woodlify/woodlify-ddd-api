import { Piece } from "../entities/piece.entity";

export class CreatedDesignEvent {
    constructor (
        public readonly id: number,
        public readonly title: string,
        public readonly pieces: Piece[],
        public readonly designedDate: Date,
        public readonly lastModificationDate: Date
    ) {

    }
}