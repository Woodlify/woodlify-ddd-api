import { Edge } from "src/FurnitureDesign/domain/entities/edge.entity";
import { EdgeTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/entities/edge.typorm";
import { PieceIdTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/value-objects/piece-id.typeorm";
import { VertexTypeorm } from "src/FurnitureDesign/infraestructure/persistence/typeorm/value-objects/vertex.typeorm";

export class EdgeMapper {
    public static toTypeOrm(edge: Edge): EdgeTypeorm {
        const edgeTypeOrm: EdgeTypeorm = new EdgeTypeorm();
        edgeTypeOrm.vertex = VertexTypeorm.from(
            edge.vertex.x1,
            edge.vertex.y1,
            edge.vertex.z1,
            edge.vertex.x2,
            edge.vertex.y2,
            edge.vertex.z2
        );
        edgeTypeOrm.pieceId = PieceIdTypeorm.from(edge.getId().getEdgeId());
        return edgeTypeOrm;
    }
}