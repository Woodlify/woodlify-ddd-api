import { FurnitureTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/furniture.typeorm";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("furnitures_manager")
export class FurnitureManagerTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column('varchar', { name: 'name', length: 100, nullable: false })
    public name: string;

    @OneToMany(type => FurnitureTypeORM, furniture => furniture.furnitureManager)
    public furnitures: FurnitureTypeORM[];
}
