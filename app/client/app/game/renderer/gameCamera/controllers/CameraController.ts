import { Point3 } from '../../../../utils/Geometry';

export default abstract class CameraController {
    protected position: Point3;
    protected target: Point3;

    constructor(handlerElement: HTMLElement, position: Point3, target: Point3) {
        this.position = position;
        this.target = target;
        this.setEventHandler(handlerElement);
    }

    public abstract update(time: number): void;
    public abstract setEventHandler(element: HTMLElement): void;
    public abstract detachEventHandler(): void;
}
