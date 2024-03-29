export default class Random {
    seed: number;
    z = 0;
    constructor(seed?: number) {
        this.seed = seed || Math.random();
        this.z = (1664525 * this.seed + 1013904223) % 4294967296;
    }

    public getSeed() {
        return this.seed;
    }

    public get() {
        this.z = (1664525 * this.z + 1013904223) % 4294967296;
        return this.z / 4294967296;
    }

    public getBetween(min: number, max: number, float = true) {
        const value = this.get();
        const delta = max - min;
        let rand = delta * value;
        rand = float ? rand : Math.round(rand);
        return min + rand;
    }
}
