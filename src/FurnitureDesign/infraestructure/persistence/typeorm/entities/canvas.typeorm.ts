import { CanvasId } from "src/FurnitureDesign/domain/value-objects/canvas-id.value";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('canvases')
export class CanvasTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', { name: 'name', length: 50, nullable: false })
    public name: string;

    @Column('date', {name: 'creation_date', nullable: false})
    public createdAt: Date;

    @Column('date', { name: 'last_modification_date', nullable: false })
    public lastModification: Date;
}