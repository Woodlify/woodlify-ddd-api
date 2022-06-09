import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CanvasIdTypeorm } from "../value-objects/canvas-id.typeorm";

@Entity('furnitures')
export class Furniture {
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
}