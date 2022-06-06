export class RegisterCanvasResponse{
    constructor(
        public id:number,
        public readonly name:string,
        public readonly createdAt:Date,
        public readonly lastModification:Date
    ){}
}