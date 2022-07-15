import { Point3 } from '../../../../../common/geometry/Geometry';
import CameraController from '../CameraController';

export default class OrbitController extends CameraController {
    constructor(positionPoint: Point3, targetPoint: Point3) {
        super(positionPoint, targetPoint);
    }

    public update(): void {
        return;
    }
}
