import { CanvasId } from "../value-objects/canvas-id.value";

export class Canvas {
    constructor(
        private _id: CanvasId,
        private _name: string,
        private _createdAt: Date,
        private _lastMofication: Date
    ) {

    }
    getId(): CanvasId {
        return this._id;
    }
}