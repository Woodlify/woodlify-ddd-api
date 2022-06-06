export class RegisterTextureResponse{
    constructor(
        public id:number,
        public readonly colorRGB:number,
        public readonly pixelsDensity:number,
        public readonly material:number
    ) {}
}