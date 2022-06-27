import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FurnitureTypeORM } from "./furniture.typeorm";

@Entity('canvases')
export class CanvasTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', { name: 'name', length: 50, nullable: false })
    public name: string;

    @Column('datetime', {name: 'creation_date', nullable: false})
    public createdAt: Date;

    @Column('datetime', { name: 'last_modification_date', nullable: false })
    public lastModification: Date;
}