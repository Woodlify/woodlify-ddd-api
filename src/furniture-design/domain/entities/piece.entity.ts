import { Edge } from "./edge.entity";
import { Texture } from "./texture.entity";
import { PieceId } from "../value-objects/piece-id.value";
import { FurnitureId } from "../value-objects/furniture-id.value";
import { GraphicComponent } from "../composite/graphic-component";



export class Piece extends GraphicComponent {
    private _faces: GraphicComponent[];
    private _textures: GraphicComponent[];
    
    constructor(
        private _id: PieceId,
        private _length: number,
        private _height: number,
        private _width: number,
        private _name: string,
        private _furnitureId: FurnitureId
    ) {
        super();
        this._faces = [];
        this._textures = [];
    }
    public getId(): PieceId {
        return this._id;
    }

    public getLength(): number {
        return this._length;
    }

    public getHeight(): number {
        return this._height;
    }

    public getWidth(): number {
        return this._width;
    }

    public getName(): string {
        return this._name;
    }

    public furnitureId(): FurnitureId {
        return this._furnitureId;
    }
    addFace(face: Edge): void {
        this._faces.push(face);
    }
    getFaces(): GraphicComponent[] {
        return [...this._faces];
    }
    public addComponent(texture: GraphicComponent): void {
        this._textures.push(texture);
    }
    getTextures(): GraphicComponent[] {
        return [...this._textures];
    }
}