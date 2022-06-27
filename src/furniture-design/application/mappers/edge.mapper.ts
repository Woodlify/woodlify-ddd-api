import { Edge } from "src/furniture-design/domain/entities/edge.entity";
import { EdgeTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/edge.typeorm";
import { PieceIdTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/value-objects/piece-id.typeorm";
import { VertexTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/value-objects/vertex.typeorm";

export class EdgeMapper {
    public static toTypeOrm(edge: Edge): EdgeTypeORM {
        const edgeTypeOrm: EdgeTypeORM = new EdgeTypeORM();
        edgeTypeOrm.vertex = VertexTypeORM.from(
            edge.vertex.x1,
            edge.vertex.y1,
            edge.vertex.z1,
            edge.vertex.x2,
            edge.vertex.y2,
            edge.vertex.z2
        );
        edgeTypeOrm.pieceId = PieceIdTypeORM.from(edge.getId().getEdgeId());
        return edgeTypeOrm;
    }
}