import { PrimaryGeneratedColumn } from "typeorm";

export class FurnitureManagerIdTypeORM {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public value: number;

    private constructor(value: number) {
        this.value = Number(value);
    }
    public static from(value: number): FurnitureManagerIdTypeORM  {
        return new FurnitureManagerIdTypeORM(value);
    }
}