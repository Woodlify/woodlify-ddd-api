import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CanvasIdTypeorm } from "../value-objects/canvas-id.typeorm";
import { PieceTypeorm } from "./piece.typeorm";

@Entity('furnitures')
export class FurnitureTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', {name: 'name', length: 50, nullable: false})
    public name: string;

    @Column('datetime', {name: 'creation_date', nullable: false})
    public designDate: Date;

    @Column('datetime', {name: 'last_modification_date', nullable: false})
    public lastModificationDate: Date;

    @Column( (type) => CanvasIdTypeorm, { prefix: false })
    public canvasId: CanvasIdTypeorm;

    @OneToMany(type => PieceTypeorm, piece => piece.furniture)
    pieces: PieceTypeorm[];
}