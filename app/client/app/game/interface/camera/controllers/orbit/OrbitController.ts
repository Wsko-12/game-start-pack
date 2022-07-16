import { PerspectiveCamera } from 'three';
import { Point2, Point3, Vector2, Vector3 } from '../../../../../common/geometry/Geometry';
import GameCamera from '../../GameCamera';
import CameraController from '../CameraController';
import CameraEventsHandler from './Handler';

export default class OrbitController extends CameraController {
    public targetDirection = {
        front: 0,
        left: 0,
    };

    public cameraAngles = {
        alpha: 0,
        tetha: 0,

        deltaAlpha: 0,
        deltaTetha: 0,
    };
    public zoom = 1;

    private _blockHeightAngles = {
        min: (Math.PI / 180) * 10,
        max: Math.PI / 2 - (Math.PI / 180) * 10,
    };

    private _camera: PerspectiveCamera;

    public rotationAngel = 0;
    public heightAngle = 0;

    private _speed = 1;
    private _smooth = 0.9;

    private _handler = new CameraEventsHandler(this);
    constructor(positionPoint: Point3, targetPoint: Point3, camera: PerspectiveCamera) {
        super(positionPoint, targetPoint);
        this._camera = camera;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(globalThis as any).$dev) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (globalThis as any).$dev = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).$dev.camera = {
            setBlocksAngles: (min: number, max: number) => {
                this.setBlocksAngles(min, max);
            },
            setSmooth: (value: number) => {
                this.setSmooth(value);
            },
        };
    }

    public update(time: number): void {
        this._handler.update(time);

        const halfFovRad = (this._camera.fov / 2) * (Math.PI / 180);
        const cameraUnit = 0.5 / halfFovRad;

        this.rotateCamera(cameraUnit);

        // if (this.targetDirection.left < 0 && this.targetDirection.left > -0.00000000005) {
        //     this.targetDirection.left = 0;
        // }

        // this.targetDirection.front *= this._smooth;
        // if (this.targetDirection.front > 0 && this.targetDirection.front < 0.00000000005) {
        //     this.targetDirection.front = 0;
        // }
        // if (this.targetDirection.front < 0 && this.targetDirection.front > -0.00000000005) {
        //     this.targetDirection.front = 0;
        // }
        // console.log(this.cameraAngles.deltaAlpha, this.cameraAngles.deltaTetha)

        // const length = this._cameraPosition.getDistanceTo(this._targetPosition);

        // const cameraFrontVector = new Vector2(
        //     this._cameraPosition.x - this._targetPosition.x,
        //     this._cameraPosition.z - this._targetPosition.z
        // );
        // const cameraLeftVector = cameraFrontVector.getPerpendicularVector();

        // const targetPoint2D = new Point2(this._targetPosition.x, this._targetPosition.z);

        // cameraFrontVector.normalize().scale(this.targetDirection.front);
        // cameraLeftVector.normalize().scale(this.targetDirection.left);

        // cameraFrontVector
        //     .addVector(cameraLeftVector)
        //     .scale(this._speed * this._zoom)
        //     .movePoint(targetPoint2D);

        // this._targetPosition.x = targetPoint2D.x;
        // this._targetPosition.z = targetPoint2D.y;

        // const cameraPositionXZ = targetPoint2D.getCirclePoint(this.rotationAngel);

        // this._cameraPosition.x = cameraPositionXZ.x;
        // this._cameraPosition.y = this._targetPosition.y + this._zoom;
        // this._cameraPosition.z = cameraPositionXZ.y;

        // this.targetDirection.left *= this._smooth;
        // if (this.targetDirection.left > 0 && this.targetDirection.left < 0.00000000005) {
        //     this.targetDirection.left = 0;
        // }
        // if (this.targetDirection.left < 0 && this.targetDirection.left > -0.00000000005) {
        //     this.targetDirection.left = 0;
        // }

        // this.targetDirection.front *= this._smooth;
        // if (this.targetDirection.front > 0 && this.targetDirection.front < 0.00000000005) {
        //     this.targetDirection.front = 0;
        // }
        // if (this.targetDirection.front < 0 && this.targetDirection.front > -0.00000000005) {
        //     this.targetDirection.front = 0;
        // }
    }

    private rotateCamera(unit: number) {
        this.cameraAngles.alpha += this.cameraAngles.deltaAlpha;
        this.cameraAngles.tetha += this.cameraAngles.deltaTetha;
        if (this.cameraAngles.tetha < this._blockHeightAngles.min) {
            this.cameraAngles.tetha = this._blockHeightAngles.min;
            this.cameraAngles.deltaTetha = 0;
        }
        if (this.cameraAngles.tetha > this._blockHeightAngles.max) {
            this.cameraAngles.tetha = this._blockHeightAngles.max;
            this.cameraAngles.deltaTetha = 0;
        }

        this.cameraAngles.deltaTetha = this.smoothDeltaValue(this.cameraAngles.deltaTetha);
        this.cameraAngles.deltaAlpha = this.smoothDeltaValue(this.cameraAngles.deltaAlpha);

        const cameraXZ = new Point2(this._targetPosition.x, this._targetPosition.z).getCirclePoint(
            this.cameraAngles.alpha
        );
        const cameraY = Math.tan(this.cameraAngles.tetha);

        const cameraVector = new Vector3(
            cameraXZ.x - this._targetPosition.x,
            cameraXZ.y - this._targetPosition.z,
            cameraY
        );
        cameraVector.normalize().scale(this.zoom * unit);

        const cameraPosition = new Point3(this._targetPosition.x, this._targetPosition.y, this._targetPosition.z);
        cameraPosition.x += cameraVector.x;
        cameraPosition.y += cameraVector.z;
        cameraPosition.z += cameraVector.y;

        this._cameraPosition.x = cameraPosition.x;
        this._cameraPosition.y = cameraPosition.y;
        this._cameraPosition.z = cameraPosition.z;
    }

    private smoothDeltaValue(value: number): number {
        if (value != 0) {
            value *= this._smooth;
            if (value > 0 && value < 0.000005) {
                value = 0;
            }
            if (value < 0 && value > -0.000005) {
                value = 0;
            }
        }
        return value;
    }

    public setEventHandler(element: HTMLElement): void {
        this._handler.attach(element);
    }

    public detachEventHandler(): void {
        this._handler.detach();
    }

    private setBlocksAngles(min: number, max: number): void {
        this._blockHeightAngles.min = (Math.PI / 180) * min;
        this._blockHeightAngles.max = Math.PI / 2 - (Math.PI / 180) * max;
    }

    private setSmooth(value: number): void {
        if (value > 0.99) {
            value = 0.99;
        }
        if (value < 0) {
            value = 0;
        }
        this._smooth = value;
    }
}
