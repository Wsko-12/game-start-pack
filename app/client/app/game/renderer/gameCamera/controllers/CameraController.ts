import { Point3 } from '../../../../utils/Geometry';

export default abstract class CameraController {
    protected _cameraPosition: Point3;
    protected _targetPosition: Point3;

    constructor(handlerElement: HTMLElement, position: Point3, target: Point3) {
        this._cameraPosition = position;
        this._targetPosition = target;
    }

    public abstract update(time: number): void;
    public abstract setEventHandler(element: HTMLElement): void;
    public abstract detachEventHandler(): void;
}
