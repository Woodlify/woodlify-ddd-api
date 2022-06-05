import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { WithWidthColumnType } from "typeorm/driver/types/ColumnTypes";

@Entity('pieces')
export class PieceTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    
    public length: number;

    public height: number;
}