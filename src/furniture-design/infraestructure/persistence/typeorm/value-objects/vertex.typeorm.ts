import { Column } from "typeorm";

export class VertexTypeorm {
    @Column('int', { name: 'x1', nullable: false })
    public x1: number;

    @Column('int', { name: 'y1', nullable: false })
    public y1: number;

    @Column('int', { name: 'z1', nullable: false })
    public z1: number;

    @Column('int', { name: 'x2', nullable: false })
    public x2: number;

    @Column('int', { name: 'y2', nullable: false })
    public y2: number;

    @Column('int', { name: 'z2', nullable: false })
    public z2: number;

    private constructor(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.z1 = z1;
        this.x2 = x2;
        this.y2 = y2;
        this.z2 = z2;
    }

    public static from(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): VertexTypeorm {
        return new VertexTypeorm(x1,y1,z1,x2,y2,z2);
    }
}