import { WoodType } from "src/furniture-design/domain/enums/woodType.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColorRGBTypeORM } from "../value-objects/color-rgb.typeorm";

@Entity('textures')
export class TextureTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    
    @Column( (type) => ColorRGBTypeORM, { prefix: false })
    public color: ColorRGBTypeORM;

    @Column('int', { name: 'pixels_density', nullable: false })
    public pixelsDensity: number;

    @Column({name: 'material', type: 'enum', enum: WoodType, default: WoodType.ACACIA })
    public material: WoodType;
}