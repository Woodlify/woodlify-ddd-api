import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PieceIdTypeORM } from "../value-objects/piece-id.typeorm";
import { VertexTypeORM } from "../value-objects/vertex.typeorm";

@Entity('edges')
export class EdgeTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column((type) => VertexTypeORM, { prefix: false })
    public vertex: VertexTypeORM;

    @Column( (type) => PieceIdTypeORM, { prefix: false })
    public pieceId: PieceIdTypeORM;
}