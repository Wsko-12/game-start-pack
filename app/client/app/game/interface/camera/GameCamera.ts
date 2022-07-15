import { PerspectiveCamera } from 'three';
import { Point3 } from '../../../common/geometry/Geometry';
import CameraController from './controllers/CameraController';
import OrbitController from './controllers/orbit/OrbitController';

export default class GameCamera {
    private _camera: PerspectiveCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    private _controller: CameraController | null = null;
    private _position = new Point3(0, 5, 0);
    private _target = new Point3(0, 0, 0);

    public getThreeCamera(): PerspectiveCamera {
        return this._camera;
    }

    public setController(controller: 'orbit') {
        if (this._controller) this._controller.detachEventHandler();
        if (controller === 'orbit') {
            this._controller = new OrbitController(this._position, this._target);
        }
    }

    public update(time: number) {
        this._camera.position.set(this._position.x, this._position.y, this._position.z);
        this._camera.lookAt(this._target.x, this._target.y, this._target.z);

        if (this._controller) this._controller.update();
    }

    public setEventHandler(element: HTMLElement): void {
        if (this._controller) {
            this._controller.setEventHandler(element);
        }
    }
}
