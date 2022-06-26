import { FurnitureState } from "src/furniture-design/domain/enums/furnitureState.enum";
import { FurnitureManagerTypeORM } from "src/furniture-manager/infrastructure/persistence/typeorm/entities/furniture-manager.typeorm";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CanvasIdTypeORM } from "../value-objects/canvas-id.typeorm";
import { PieceTypeORM } from "./piece.typeorm";

@Entity('furnitures')
export class FurnitureTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', {name: 'name', length: 50, nullable: false})
    public name: string;

    @Column('datetime', {name: 'creation_date', nullable: false})
    public designDate: Date;

    @Column('datetime', {name: 'last_modification_date', nullable: false})
    public lastModificationDate: Date;

    @Column({name: 'state', type: 'enum', enum: FurnitureState, default: FurnitureState.CREATED })
    public state: FurnitureState;

    @Column( (type) => CanvasIdTypeORM, { prefix: false })
    public canvasId: CanvasIdTypeORM;

    @OneToMany(type => PieceTypeORM, piece => piece.furniture)
    pieces: PieceTypeORM[];

    @ManyToOne(type => FurnitureManagerTypeORM, furnitureManager => furnitureManager.furnitures)
    furnitureManager: FurnitureManagerTypeORM
}