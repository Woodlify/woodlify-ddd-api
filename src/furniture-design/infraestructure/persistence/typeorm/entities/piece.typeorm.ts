import { Furniture } from "src/FurnitureDesign/domain/aggregates/furniture-design.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WithWidthColumnType } from "typeorm/driver/types/ColumnTypes";
import { FurnitureTypeorm } from "./furniture.typeorm";

@Entity('pieces')
export class PieceTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    
    @Column('int', {name: 'length', nullable: false })
    public length: number;

    @Column('int', {name: 'height', nullable: false })
    public height: number;

    @Column('varchar', {name: 'name', length: 50, nullable: false})
    public name: string;

    @ManyToOne(type => FurnitureTypeorm, furniture => furniture.pieces)
    public furniture: FurnitureTypeorm;
}