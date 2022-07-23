import { Point3 } from '../../../../utils/geometry/Geometry';

export default abstract class CameraController {
    protected _cameraPosition: Point3;
    protected _targetPosition: Point3;

    constructor(positionPoint: Point3, targetPoint: Point3) {
        this._cameraPosition = positionPoint;
        this._targetPosition = targetPoint;
    }

    public abstract update(time: number): void;
    public abstract setEventHandler(element: HTMLElement): void;
    public abstract detachEventHandler(): void;
}
