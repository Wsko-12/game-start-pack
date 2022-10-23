import { PerspectiveCamera } from 'three';
import { Point3 } from '../../../../../utils/Geometry';
import { TLoopCallback } from '../../../../loopsManager/loop/Loop';
import CameraController from '../CameraController';

export default class CameraOrbitController extends CameraController {
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

    private camera: PerspectiveCamera;

    private blockRect = {
        x: -10,
        y: -10,
        width: 20,
        height: 20,
    };

    constructor(handler: HTMLElement, position: Point3, target: Point3, camera: PerspectiveCamera) {
        super(handler, position, target);
        this.camera = camera;
    }

    public update: TLoopCallback = (/* time */) => {
        return;
    };

    public setEventHandler(element: HTMLElement) {
        return;
    }
    public detachEventHandler() {
        return;
    }
}
