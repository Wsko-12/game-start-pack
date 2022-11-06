import { PerspectiveCamera } from 'three';
import { Point2, Vector3, Vector2, Point3 } from '../../../../../utils/Geometry';
import CameraController from '../CameraController';
import OrbitControllerHandler from './handler/OrbitControllerHandler';

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
        blockTetha: {
            min: (Math.PI / 180) * 10,
            max: Math.PI / 2 - (Math.PI / 180) * 10,
        },
    };
    public zoom = {
        value: 1,
        max: 10,
        min: 0.5,
        delta: 0,
    };

    private _blockRect = {
        x: -10,
        y: -10,
        width: 20,
        height: 20,
    };

    private _camera: PerspectiveCamera;

    public speed = 1;
    private _smooth = 0.8;

    private _handler = new OrbitControllerHandler(this);
    constructor(handlerElement: HTMLElement, positionPoint: Point3, targetPoint: Point3, camera: PerspectiveCamera) {
        super(handlerElement, positionPoint, targetPoint);
        this._camera = camera;
        this._handler.attach(handlerElement);
    }

    public update(time: number): void {
        this._handler.update(time);

        const halfFovRad = (this._camera.fov / 2) * (Math.PI / 180);
        const cameraUnit = 0.5 / Math.tan(halfFovRad);

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
        const cameraHeight = unit * this.zoom.value;
        cameraFrontVector.normalize().scale(cameraHeight * this.targetDirection.deltaY * 2.5);
        cameraSideVector.normalize().scale(cameraHeight * -this.targetDirection.deltaX * this._camera.aspect * 2);

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
        if (this.cameraAngles.tetha < this.cameraAngles.blockTetha.min) {
            this.cameraAngles.tetha = this.cameraAngles.blockTetha.min;
            this.cameraAngles.deltaTetha = 0;
        }
        if (this.cameraAngles.tetha > this.cameraAngles.blockTetha.max) {
            this.cameraAngles.tetha = this.cameraAngles.blockTetha.max;
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

    public setAnglesBlocks(min: number, max: number): void {
        this.cameraAngles.blockTetha.min = (Math.PI / 180) * min;
        this.cameraAngles.blockTetha.max = Math.PI / 2 - (Math.PI / 180) * max;
    }

    public setZoomBlocks(min: number, max: number): void {
        if (min >= max) return;
        if (min < 0) min = 0;
        this.zoom.min = min;
        this.zoom.max = max;
    }

    public setSpeed(value: number): void {
        if (value < 0) {
            value = 0;
        }
        this.speed = value;
    }

    public setSmooth(value: number): void {
        if (value > 0.99) {
            value = 0.99;
        }
        if (value < 0) {
            value = 0;
        }
        this._smooth = value;
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
