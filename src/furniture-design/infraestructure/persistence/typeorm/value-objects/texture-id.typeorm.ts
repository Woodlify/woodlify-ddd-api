import { PrimaryGeneratedColumn } from "typeorm";

export class TextureIdTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public value: number;
    private constructor(value: number) {
        this.value = Number(value);
    }
    public static from(value: number): TextureIdTypeorm  {
        return new TextureIdTypeorm(value);
    }
}