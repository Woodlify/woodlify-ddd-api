import { CustomerId } from "../value-objects/customer-id.value";
import { FurnitureId } from "../value-objects/furniture-id.value";
import { CanvasId } from "../value-objects/canvas-id.value";
import { Piece } from "../entities/piece.entity";
import { AggregateRoot } from "@nestjs/cqrs";
import { CreatedDesignEvent } from "../events/created-design.event";

export class Furniture extends AggregateRoot {
    private _id: FurnitureId;
    private _name: string;
    private _pieces: Piece[];
    private _designDate: Date;
    private _lastModificationDate: Date;
    private _canvasId: CanvasId;

    constructor(id: FurnitureId, designDate: Date, lastModificationDate: Date, name: string, canvasId: CanvasId){
        super();
        this._id = id;
        this._pieces = [];
        this._designDate = designDate;
        this._lastModificationDate = lastModificationDate;
        this._name = name;
        this._canvasId = canvasId;
    }
    
    addShape(shape: Piece): void {
        this._pieces.push(shape);
    }

    getId(): FurnitureId {
        return this._id;
    }
    getShapes(): Piece[] {
        return [...this._pieces];
    }
    changeId(id: FurnitureId): void {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    get designDate() {
        return this._designDate;
    }
    get lastModificationDate() {
        return this._lastModificationDate;
    }
    get canvasId() {
        return this._canvasId;
    }

    public register() {
        const event = new CreatedDesignEvent(
            this._id.getFurnitureId(),
            this._name,
            this._pieces,
            this._designDate,
            this._lastModificationDate
        );
        this.apply(event);
    }
}