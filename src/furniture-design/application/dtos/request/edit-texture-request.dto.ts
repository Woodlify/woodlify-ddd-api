export class EditTextureRequest{
    constructor(
        public readonly id:number,
        public readonly colorRGB:number,
        public readonly pixelsDensity:number,
        public readonly material:number
        ){}
}