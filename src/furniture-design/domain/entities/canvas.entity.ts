import { AggregateRoot } from "@nestjs/cqrs";
import { CreatedCanvasEvent } from "../events/created-canvas.event";
import { CanvasId } from "../value-objects/canvas-id.value";

export class Canvas extends AggregateRoot{
    constructor(
        private _id: CanvasId,
        private _name: string,
        private _createdAt: Date,
        private _lastModification: Date
    ) {
        super();
    }
    public getId(): CanvasId {
        return this._id;
    }

    public getName(): string{
        return this._name;
    }

    public getCreatedAt(): Date{
        return this._createdAt;
    }

    public getLastModification(): Date{
        return this._lastModification;
    }

    public changeId(id: CanvasId){
        this._id = id;
    }

    public register() {
        const event = new CreatedCanvasEvent(
            this._id.getCanvasId(),
            this._name,
            this._createdAt,
            this._lastModification
        );
        this.apply(event);
    }

}