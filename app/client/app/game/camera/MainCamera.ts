import { PerspectiveCamera } from 'three';
import CameraEventsHandler from './eventsHandler/CameraEventsHandler';

export default class MainCamera {
    private static _instance: MainCamera;
    private _camera: PerspectiveCamera = new PerspectiveCamera();
    private _eventsHandlerElement: HTMLElement | undefined;
    private _eventsHandler: CameraEventsHandler = new CameraEventsHandler(this);
    constructor() {
        if (!MainCamera._instance) MainCamera._instance = this;
    }

    public getThreeCamera(): PerspectiveCamera {
        return this._camera;
    }

    public setMouseEventsHandler(element: HTMLElement) {
        if (this._eventsHandlerElement) this.detachEvents();
        this._eventsHandlerElement = element;
        this.attachEvents();
    }

    private detachEvents(): void {
        if (this._eventsHandlerElement) {
            this._eventsHandler.detach(this._eventsHandlerElement);
        }
    }

    private attachEvents(): void {
        if (this._eventsHandlerElement) {
            this._eventsHandler.attach(this._eventsHandlerElement);
        }
    }
}
