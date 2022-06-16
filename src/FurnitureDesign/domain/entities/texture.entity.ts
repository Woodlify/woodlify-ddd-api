import { ColorRGB } from "../value-objects/colorRGB.value";
import { TextureId } from "../value-objects/texture-id.value";

export class Texture {
    constructor(
        private _id: TextureId,
        private _colorRGB: ColorRGB,
        private _pixelsDensity: number,
        private _material: number
    ) {
        
    }
    get color(): ColorRGB {
        return this._colorRGB;
    }
    changeColor(newColor: ColorRGB): void {
        this._colorRGB = {...newColor};
    }
    get textureId(): TextureId {
        return this._id;
    }
    get pixelsDensity() {
        return this._pixelsDensity;
    }
    get material() {
        return this._material;
    }
}

