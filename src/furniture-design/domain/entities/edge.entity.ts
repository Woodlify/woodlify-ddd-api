import { GraphicComponent } from "../composite/graphic-component";
import { EdgeId } from "../value-objects/edge-id.value";
import { Vertex } from "../value-objects/vertex.value";

export class Edge extends GraphicComponent {
    constructor(
        private _id: EdgeId,
        private _vertex: Vertex
    ){
        super();
    }
    getId(): EdgeId {
        return this._id;
    }
    get vertex() {
        return this._vertex;
    }
}