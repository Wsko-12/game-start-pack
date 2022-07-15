import GameCamera from '../GameCamera';

export default abstract class CameraController {
    protected _camera: GameCamera;
    constructor(camera: GameCamera) {
        this._camera = camera;
    }

    public abstract update(): void;
}
