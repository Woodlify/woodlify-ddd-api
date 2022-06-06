import { WoodType } from "src/FurnitureDesign/domain/enums/woodType.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColorRGBTypeorm } from "../value-objects/color-rgb.typeorm";

@Entity('textures')
export class TextureTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;
    
    @Column( (type) => ColorRGBTypeorm, { prefix: false })
    public color: ColorRGBTypeorm;

    @Column('int', { name: 'pixels_density', nullable: false })
    public pixelsDensity: number;

    @Column({name: 'material', type: 'enum', enum: WoodType, default: WoodType.ACACIA })
    public material: WoodType;
}