const NUM_PREC = 4;

export function roundNum(num: number, precision = NUM_PREC): number {
    return Math.round(num * 10 ** precision) / 10 ** precision;
}

export class Point2 {
    public x: number;
    public y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    getDistanceTo(x?: Point3 | Point2 | number, y?: number): number {
        if (x instanceof Point2 || x instanceof Point3) {
            return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2));
        }
        if (!x && !y) {
            return this.getDistanceTo(new Point2(0, 0));
        }
        if (typeof x === 'number' && typeof y === 'number') {
            return this.getDistanceTo(new Point2(x, y));
        }
        return 0;
    }
}

export class Point3 {
    public x: number;
    public y: number;
    public z: number;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getDistanceTo(x?: Point3 | Point2 | number, y?: number, z?: number): number {
        if (x instanceof Point3) {
            return roundNum(Math.sqrt((this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2));
        }

        if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return this.getDistanceTo(new Point3(x, y, z));
        } else if (typeof x === 'number' && typeof y === 'number' && !z) {
            return this.getDistanceTo(new Point3(x, y, this.z));
        } else if (typeof x === 'number' && !y && !z) {
            return this.getDistanceTo(new Point3(x, this.y, this.z));
        } else if (x instanceof Point2) {
            return this.getDistanceTo(new Point3(x.x, x.y, this.z));
        } else if (!x && !y && !z) {
            return this.getDistanceTo(new Point3(0, 0, 0));
        }
        return 0;
    }
}
