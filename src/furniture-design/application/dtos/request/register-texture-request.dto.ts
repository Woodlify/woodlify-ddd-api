export class RegisterTextureRequest{
    constructor(
        public readonly colorRGB:number,
        public readonly pixelsDensity:number,
        public readonly material:number
    ) {}
}