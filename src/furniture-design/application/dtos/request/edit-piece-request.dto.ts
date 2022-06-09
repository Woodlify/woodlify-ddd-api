export class EditPieceRequest{
    constructor(
        public readonly length:number,
        public readonly height:number,
        public readonly width:number,
        public readonly name:string
    ){}
}