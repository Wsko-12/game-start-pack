import { PerspectiveCamera } from 'three';
import { Point2, Point3, Vector2, Vector3 } from '../../../../../common/geometry/Geometry';
import CameraController from '../CameraController';
import CameraEventsHandler from './Handler';

export default class OrbitController extends CameraController {
    public targetDirection = {
        deltaX: 0,
        deltaY: 0,
    };

    public cameraAngles = {
        alpha: Math.PI / 4,
        tetha: Math.PI / 4,

        deltaAlpha: 0,
        deltaTetha: 0,
    };
    public zoom = {
        value: 1,
        max: 10,
        min: 0.5,
        delta: 0,
    };

    private _blockRect = {
        x: -0.5,
        y: -0.5,
        width: 1,
        height: 1,
    };

    private _blockHeightAngles = {
        min: (Math.PI / 180) * 10,
        max: Math.PI / 2 - (Math.PI / 180) * 10,
    };

    private _camera: PerspectiveCamera;

    public rotationAngel = 0;
    public heightAngle = 0;

    public speed = 1;
    private _smooth = 0.85;

    private _handler = new CameraEventsHandler(this);
    constructor(positionPoint: Point3, targetPoint: Point3, camera: PerspectiveCamera) {
        super(positionPoint, targetPoint);
        this._camera = camera;
        this.setDevFunctions();
    }

    public update(time: number): void {
        this._handler.update(time);

        const halfFovRad = (this._camera.fov / 2) * (Math.PI / 180);
        const cameraUnit = 0.5 / halfFovRad;

        this.changeZoom();
        this.moveTarget(cameraUnit);
        this.rotateCamera(cameraUnit);
        this.smoothValues();
    }

    private changeZoom(): void {
        this.zoom.value += this.zoom.delta;
        if (this.zoom.value < this.zoom.min) {
            this.zoom.value = this.zoom.min;
        }
        if (this.zoom.value > this.zoom.max) {
            this.zoom.value = this.zoom.max;
        }
    }

    private moveTarget(unit: number): void {
        const cameraFrontVector = new Vector2(
            this._targetPosition.x - this._cameraPosition.x,
            this._targetPosition.z - this._cameraPosition.z
        );

        const cameraSideVector = new Vector2(-cameraFrontVector.y, cameraFrontVector.x);

        cameraFrontVector.normalize().scale(unit * this.zoom.value * this.targetDirection.deltaY);
        cameraSideVector.normalize().scale(unit * this.zoom.value * this._camera.aspect * -this.targetDirection.deltaX);

        const targetPoint2 = new Point2(this._targetPosition.x, this._targetPosition.z);
        cameraFrontVector.movePoint(targetPoint2);
        cameraSideVector.movePoint(targetPoint2);

        if (targetPoint2.x < this._blockRect.x) {
            targetPoint2.x = this._blockRect.x;
        }
        if (targetPoint2.x > this._blockRect.x + this._blockRect.width) {
            targetPoint2.x = this._blockRect.x + this._blockRect.width;
        }

        if (targetPoint2.y < this._blockRect.y) {
            targetPoint2.y = this._blockRect.y;
        }
        if (targetPoint2.y > this._blockRect.y + this._blockRect.height) {
            targetPoint2.y = this._blockRect.y + this._blockRect.height;
        }

        this._targetPosition.x = targetPoint2.x;
        this._targetPosition.z = targetPoint2.y;
    }

    private rotateCamera(unit: number): void {
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

        const cameraXZ = new Point2(this._targetPosition.x, this._targetPosition.z).getCirclePoint(
            this.cameraAngles.alpha
        );
        const cameraY = Math.tan(this.cameraAngles.tetha) + this._targetPosition.y;

        const cameraVector = new Vector3(
            cameraXZ.x - this._targetPosition.x,
            cameraXZ.y - this._targetPosition.z,
            cameraY
        );
        cameraVector.normalize().scale(this.zoom.value * unit);

        const cameraPosition = new Point3(this._targetPosition.x, this._targetPosition.y, this._targetPosition.z);
        cameraPosition.x += cameraVector.x;
        cameraPosition.y += cameraVector.z;
        cameraPosition.z += cameraVector.y;

        this._cameraPosition.x = cameraPosition.x;
        this._cameraPosition.y = cameraPosition.y;
        this._cameraPosition.z = cameraPosition.z;
    }

    private smoothValues(): void {
        this.cameraAngles.deltaTetha = this.smoothDeltaValue(this.cameraAngles.deltaTetha);
        this.cameraAngles.deltaAlpha = this.smoothDeltaValue(this.cameraAngles.deltaAlpha);

        this.zoom.delta = this.smoothDeltaValue(this.zoom.delta);

        this.targetDirection.deltaX = this.smoothDeltaValue(this.targetDirection.deltaX);
        this.targetDirection.deltaY = this.smoothDeltaValue(this.targetDirection.deltaY);
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

    private setAnglesBlocks(min: number, max: number): void {
        this._blockHeightAngles.min = (Math.PI / 180) * min;
        this._blockHeightAngles.max = Math.PI / 2 - (Math.PI / 180) * max;
    }

    private setZoomBlocks(min: number, max: number): void {
        if (min >= max) return;
        if (min < 0) min = 0;
        this.zoom.min = min;
        this.zoom.max = max;
    }

    private setSpeed(value: number): void {
        if (value < 0) {
            value = 0;
        }
        this.speed = value;
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

    private setDevFunctions(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(globalThis as any).$dev) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (globalThis as any).$dev = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).$dev.camera = {
            setAnglesBlocks: (min: number, max: number): void => {
                this.setAnglesBlocks(min, max);
            },
            setSmooth: (value: number): void => {
                this.setSmooth(value);
            },
            setSpeed: (value: number): void => {
                this.setSpeed(value);
            },
            setZoomBlocks: (min: number, max: number): void => {
                this.setZoomBlocks(min, max);
            },
            setTargetPosition: (x: number, y: number, z: number): void => {
                this.setTargetPosition(x, y, z);
            },
            setBlockRect: (x: number, y: number, width: number, height: number): void => {
                this.setBlockRect(x, y, width, height);
            },
        };
    }

    public setTargetPosition(x: number, y: number, z: number): void {
        this._targetPosition.x = x;
        this._targetPosition.y = y;
        this._targetPosition.z = z;
    }

    public setBlockRect(x: number, y: number, width: number, height: number) {
        this._blockRect.x = x;
        this._blockRect.y = y;
        this._blockRect.width = width;
        this._blockRect.height = height;
    }
}
