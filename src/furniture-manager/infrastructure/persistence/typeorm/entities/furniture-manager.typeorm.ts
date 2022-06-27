import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('furniture_managers')
export class FurnitureManagerTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true
  })
  public id: number;

  @Column('varchar', { name: 'name', length: 100, nullable: false })
  public name: string;
}
