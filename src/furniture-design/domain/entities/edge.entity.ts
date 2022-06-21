import { EdgeId } from "../value-objects/edge-id.value";
import { Vertex } from "../value-objects/vertex.value";

export class Edge {
    constructor(
        private _id: EdgeId,
        private _vertex: Vertex
    ){}
    getId(): EdgeId {
        return this._id;
    }
    get vertex() {
        return this._vertex;
    }
}