import { PerspectiveCamera } from 'three';

export default class GameCamera {
    private static camera: PerspectiveCamera | null = null;
    static init() {
        const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 50);
        this.camera = camera;
    }

    static getCamera() {
        if (!this.camera) {
            throw new Error('[GameCamera getCamera] camera undefined');
        }
        return this.camera;
    }
}
