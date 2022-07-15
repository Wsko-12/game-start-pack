import { Point2, Point3, Vector2, Vector3 } from '../../../../../common/geometry/Geometry';
import CameraController from '../CameraController';
import CameraEventsHandler from './Handler';

export default class OrbitController extends CameraController {
    public targetDirection = {
        front: 0,
        left: 0,
    };
    private _speed = 0.015;
    private _smooth = 0.8;
    private _handler = new CameraEventsHandler(this);
    constructor(positionPoint: Point3, targetPoint: Point3) {
        super(positionPoint, targetPoint);
    }

    public update(): void {
        const cameraFrontVector = new Vector2(
            this._cameraPosition.x - this._targetPosition.x,
            this._cameraPosition.z - this._targetPosition.z
        );
        const cameraLeftVector = cameraFrontVector.getPerpendicularVector();

        const targetPoint2D = new Point2(this._targetPosition.x, this._targetPosition.z);

        cameraFrontVector.normalize().scale(this.targetDirection.front);
        cameraLeftVector.normalize().scale(this.targetDirection.left);

        cameraFrontVector.addVector(cameraLeftVector).scale(this._speed).movePoint(targetPoint2D);

        this._targetPosition.x = targetPoint2D.x;
        this._targetPosition.z = targetPoint2D.y;

        this._cameraPosition.x = this._targetPosition.x + 0;
        this._cameraPosition.y = this._targetPosition.y + 5;
        this._cameraPosition.z = this._targetPosition.z + 5;

        this.targetDirection.left *= this._smooth;
        if (this.targetDirection.left > 0 && this.targetDirection.left < 0.00000000005) {
            this.targetDirection.left = 0;
        }
        if (this.targetDirection.left < 0 && this.targetDirection.left > -0.00000000005) {
            this.targetDirection.left = 0;
        }

        this.targetDirection.front *= this._smooth;
        if (this.targetDirection.front > 0 && this.targetDirection.front < 0.00000000005) {
            this.targetDirection.front = 0;
        }
        if (this.targetDirection.front < 0 && this.targetDirection.front > -0.00000000005) {
            this.targetDirection.front = 0;
        }
    }

    public setEventHandler(element: HTMLElement): void {
        this._handler.attach(element);
    }

    public detachEventHandler(): void {
        this._handler.detach();
    }
}
