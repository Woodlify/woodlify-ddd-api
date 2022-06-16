export class Vertex {
    private _x1: number;
    private _y1: number;
    private _z1: number;
    private _x2: number;
    private _y2: number;
    private _z2: number;
    private constructor (
        x1: number,
        y1: number,
        z1: number,
        x2: number,
        y2: number,
        z2: number
    ) {
        this._x1 = x1;
        this._y1 = y1;
        this._z1 = z1;
        this._x2 = x2;
        this._y2 = y2;
        this._z2 = z2;
    }

    get x1() {
        return this._x1;
    }
    get y1() {
        return this._y1;
    }
    get z1() {
        return this._z1;
    }
    get x2() {
        return this._x2;
    }
    get y2() {
        return this._y2;
    }
    get z2() {
        return this._z2;
    }

    public static create(
        x1: number,
        y1: number,
        z1: number,
        x2: number,
        y2: number,
        z2: number
    ): Vertex {
        return new Vertex(x1,y1,z1,x2,y2,z2);
    }
}