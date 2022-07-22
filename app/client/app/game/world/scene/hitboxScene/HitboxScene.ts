import { Mesh } from 'three';

export default class HitboxScene {
    private all: [string | null, Mesh][] = [];
    private _groups: { [key: string]: Mesh[] } = {};
    public add(mesh: Mesh, group: string | null = null) {
        const index = this.all.findIndex((item) => item[1] === mesh);
        if (index === -1) {
            this.all.push([group, mesh]);
        }
        if (group) {
            if (!this._groups[group]) {
                this._groups[group] = [];
            }
            const indexGroup = this._groups[group].indexOf(mesh);
            if (indexGroup === -1) {
                this._groups[group].push(mesh);
            }
        }
    }

    public remove(mesh: Mesh) {
        const index = this.all.findIndex((item) => item[1] === mesh);
        if (index != -1) {
            const group = this.all[index][0];
            this.all.splice(index, 1);
            if (group) {
                const indexGroup = this._groups[group].indexOf(mesh);
                if (indexGroup != -1) {
                    this._groups[group].splice(indexGroup, 1);
                }
            }
        }
    }

    public getAll(): Mesh[] {
        return this.all.map((item) => item[1]);
    }

    public getGroup(group: string): Mesh[] | undefined {
        return this._groups[group];
    }
}
