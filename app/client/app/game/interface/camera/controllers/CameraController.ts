import { Point3 } from '../../../../common/geometry/Geometry';

export default abstract class CameraController {
    protected _cameraPosition: Point3;
    protected _targetPosition: Point3;

    protected _$cameraPosition: Point3;
    protected _$targetPosition: Point3;

    constructor(positionPoint: Point3, targetPoint: Point3) {
        this._cameraPosition = positionPoint;
        this._targetPosition = targetPoint;

        this._$cameraPosition = new Point3(...this._cameraPosition.getCordsArr());
        this._$targetPosition = new Point3(...this._targetPosition.getCordsArr());
    }

    public abstract update(): void;
}
