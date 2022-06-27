import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CanvasIdTypeORM {
    @Column({ type: 'bigint', name: 'id' })
    public value: number;
    private constructor(value: number) {
        this.value = Number(value);
    }
    public static from(value: number): CanvasIdTypeORM  {
        return new CanvasIdTypeORM(value);
    }
}