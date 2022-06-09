import { Column } from "typeorm";

export class ColorRGBTypeorm {
    @Column('int', {name: 'r_channel', nullable: false})
    public rChannel: number;
    @Column('int', {name: 'g_channel', nullable: false})
    public gChannel: number;
    @Column('int', {name: 'b_channel', nullable: false})
    public bChannel: number;

    private constructor(rChannel: number, gChannel: number, bChannel: number) {
        this.rChannel = rChannel;
        this.gChannel = gChannel;
        this.bChannel = bChannel;
    }

    public static from(rChannel: number, gChannel: number, bChannel: number): ColorRGBTypeorm {
        return new ColorRGBTypeorm(rChannel,gChannel,bChannel);
    }

}