export class EditCanvasRequest{
    constructor(
        public readonly name:string,
        public readonly createdAt:Date,
        public readonly lastModification:Date
    ){}
}