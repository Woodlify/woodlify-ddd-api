import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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