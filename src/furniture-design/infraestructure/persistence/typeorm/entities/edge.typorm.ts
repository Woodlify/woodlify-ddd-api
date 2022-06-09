import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PieceIdTypeorm } from "../value-objects/piece-id.typeorm";
import { VertexTypeorm } from "../value-objects/vertex.typeorm";

@Entity('edges')
export class EdgesTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column((type) => VertexTypeorm, { prefix: false })
    public vertex: VertexTypeorm;

    @Column( (type) => PieceIdTypeorm, { prefix: false })
    public pieceId: PieceIdTypeorm;
}