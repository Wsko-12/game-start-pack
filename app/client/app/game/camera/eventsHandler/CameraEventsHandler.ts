import MainCamera from '../MainCamera';

export default class CameraEventsHandler {
    private _camera: MainCamera;

    private mouseDown: (e: MouseEvent) => void;
    private mouseMove: (e: MouseEvent) => void;
    private mouseUp: (e: MouseEvent) => void;

    private touchStart: (e: TouchEvent) => void;
    private touchMove: (e: TouchEvent) => void;
    private touchEnd: (e: TouchEvent) => void;

    constructor(mainCamera: MainCamera) {
        this._camera = mainCamera;

        this.mouseDown = (e: MouseEvent): void => {
            console.log(e);
        };
        this.mouseMove = (e: MouseEvent): void => {
            console.log(e);
        };
        this.mouseUp = (e: MouseEvent): void => {
            console.log(e);
        };

        this.touchStart = (e: TouchEvent): void => {
            console.log(e);
        };
        this.touchMove = (e: TouchEvent): void => {
            console.log(e);
        };
        this.touchEnd = (e: TouchEvent): void => {
            console.log(e);
        };
    }

    attach(element: HTMLElement): void {
        element.addEventListener('mousedown', this.mouseDown);
        element.addEventListener('mousemove', this.mouseMove);
        element.addEventListener('mouseup', this.mouseUp);

        element.addEventListener('touchmove', this.touchMove);
        element.addEventListener('touchstart', this.touchStart);
        element.addEventListener('touchend', this.touchEnd);
    }

    detach(element: HTMLElement): void {
        element.removeEventListener('mousedown', this.mouseDown);
        element.removeEventListener('mousemove', this.mouseMove);
        element.removeEventListener('mouseup', this.mouseUp);

        element.removeEventListener('touchmove', this.touchMove);
        element.removeEventListener('touchstart', this.touchStart);
        element.removeEventListener('touchend', this.touchEnd);
    }
}
