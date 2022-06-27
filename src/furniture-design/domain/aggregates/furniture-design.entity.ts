import { FurnitureId } from "../value-objects/furniture-id.value";
import { CanvasId } from "../value-objects/canvas-id.value";
import { Piece } from "../entities/piece.entity";
import { AggregateRoot } from "@nestjs/cqrs";
import { CreatedDesignEvent } from "../events/created-design.event";
import { ModifiedDesignEvent } from "../events/modified-design.event";
import { FurnitureState } from "../enums/furnitureState.enum";

export class Furniture extends AggregateRoot {
    private _id: FurnitureId;
    private _name: string;
    private _pieces: Piece[];
    private _designDate: Date;
    private _lastModificationDate: Date;
    private _canvasId: CanvasId;
    private _state: FurnitureState;

    constructor(id: FurnitureId, designDate: Date, lastModificationDate: Date, name: string, canvasId: CanvasId){
        super();
        this._id = id;
        this._pieces = [];
        this._designDate = designDate;
        this._lastModificationDate = lastModificationDate;
        this._name = name;
        this._canvasId = canvasId;
        this._state = FurnitureState.IN_REVIEW;
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

    changeState(state: FurnitureState): void {
        this._state = state;
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
    set pieces(pieces: Piece[]) {
        this._pieces = pieces;
    }

    get state(): FurnitureState {
        return this._state;
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

    public update() {
        const event = new ModifiedDesignEvent(
            this._id.getFurnitureId(),
            this._name,
            this._pieces,
            this._designDate,
            this._canvasId
        );
        this.apply(event);
    }
}