import { FurnitureState } from "src/furniture-design/domain/enums/furnitureState.enum";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";
import { FurnitureManagerIdTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/value-objects/furniture-manager-id.typeorm";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CanvasIdTypeORM } from "../value-objects/canvas-id.typeorm";
import { CanvasTypeORM } from "./canvas.typeorm";
import { PieceTypeORM } from "./piece.typeorm";

@Entity('furnitures')
export class FurnitureTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', {name: 'name', length: 50, nullable: false})
    public name: string;

    @Column('datetime', {name: 'design_date', nullable: false})
    public designDate: Date;

    @Column('datetime', {name: 'last_modification_date', nullable: false})
    public lastModificationDate: Date;

    @Column(type => CanvasIdTypeORM, {prefix: false})
    public canvasId: CanvasIdTypeORM;

    @Column({name: 'state', type: 'enum', enum: FurnitureState, default: FurnitureState.CREATED })
    public state: FurnitureState;

    @OneToMany(type => PieceTypeORM, piece => piece.furniture)
    public pieces: PieceTypeORM[];
}