import { Scene } from 'three';

export default class World {
    static scene: Scene | null = null;
    static init() {
        const scene = new Scene();
        this.scene = scene;
    }

    static getScene() {
        if (!this.scene) {
            throw new Error('[World getScene] scene undefined');
        }
        return this.scene;
    }
}
