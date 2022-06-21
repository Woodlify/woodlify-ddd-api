import { Edge } from "../entities/edge.entity";
import { EdgeId } from "../value-objects/edge-id.value"
import { Vertex } from "../value-objects/vertex.value";

export class EdgeFactory {
    public static createFrom(
       vertex: Vertex
    ): Edge {
        return new Edge(
         EdgeId.create(0),
         vertex
        );
    }

    public static createWithId(
        edgeId: EdgeId,
        vertex: Vertex
    ): Edge {
        return new Edge(
         edgeId,
         vertex  
        );
    }
}