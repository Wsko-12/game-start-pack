import { PerspectiveCamera } from 'three';
import CameraController from './controllers/CameraController';
import OrbitController from './controllers/orbit/OrbitController';

export default class GameCamera {
    private _camera: PerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    private _controller: CameraController | null = null;

    constructor() {
        this._camera.position.set(5, 5, 5);
        this._camera.lookAt(0, 0, 0);
    }

    public getThreeCamera(): PerspectiveCamera {
        return this._camera;
    }

    public setController(controller: 'orbit') {
        if (controller === 'orbit') {
            this._controller = new OrbitController(this);
        }
    }

    public update(time: number) {
        this._camera.position.x = Math.sin(time) * 10;
        this._camera.position.z = Math.cos(time);
        this._camera.lookAt(0, 0, 0);

        if (this._controller) this._controller.update();
    }
}
