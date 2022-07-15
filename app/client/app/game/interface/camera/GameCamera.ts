import { PerspectiveCamera } from 'three';
import CameraController from './controllers/CameraController';
import OrbitController from './controllers/orbit/OrbitController';

export default class GameCamera {
    private _camera: PerspectiveCamera = new PerspectiveCamera();
    private _controller: CameraController | null = null;

    public getThreeCamera(): PerspectiveCamera {
        return this._camera;
    }

    public setController(controller: 'orbit') {
        if (controller === 'orbit') {
            this._controller = new OrbitController(this);
        }
    }

    public update() {
        if (this._controller) this._controller.update();
    }
}
