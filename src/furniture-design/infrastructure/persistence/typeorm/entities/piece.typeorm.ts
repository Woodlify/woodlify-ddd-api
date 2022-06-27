import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FurnitureTypeORM } from "./furniture.typeorm";

@Entity('pieces')
export class PieceTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    
    @Column('int', {name: 'length', nullable: false })
    public length: number;

    @Column('int', {name: 'height', nullable: false })
    public height: number;

    @Column('varchar', {name: 'name', length: 50, nullable: false})
    public name: string;

    @ManyToOne(type => FurnitureTypeORM, furniture => furniture.pieces)
    public furniture: FurnitureTypeORM;
}