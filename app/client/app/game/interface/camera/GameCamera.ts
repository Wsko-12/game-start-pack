import { PerspectiveCamera } from 'three';
import CameraController from './controllers/CameraController';
import OrbitController from './controllers/orbit/OrbitController';

export default class GameCamera {
    private _camera: PerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    private _controller: CameraController | null = null;
    private _position = {
        x: 0,
        y: 0,
        z: 0,
    };

    private _target = {
        x: 0,
        y: 0,
        z: 0,
    };

    public getThreeCamera(): PerspectiveCamera {
        return this._camera;
    }

    public setController(controller: 'orbit') {
        if (controller === 'orbit') {
            this._controller = new OrbitController(this);
        }
    }

    public update(time: number) {
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
        this._camera.lookAt(this._target.x, this._target.y, this._target.z);

        if (this._controller) this._controller.update();
    }
}
