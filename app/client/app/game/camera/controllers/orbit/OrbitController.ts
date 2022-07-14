import GameCamera from '../../GameCamera';
import CameraController from '../CameraController';

export default class OrbitController extends CameraController {
    constructor(camera: GameCamera) {
        super(camera);
    }

    public update(): void {
        return;
    }
}
