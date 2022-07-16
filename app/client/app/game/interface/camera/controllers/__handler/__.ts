import CameraController from '../CameraController';

export default class CameraEventsHandler {
    private _controller: CameraController;
    private _mouse = {
        x: 0,
        y: 0,
        clicked: false,
        context: false,
    };

    private _touch = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0,
        clicked: false,
        double: true,
    };

    private contextmenu: (e: MouseEvent) => boolean;
    private wheel: (e: WheelEvent) => void;

    private mouseDown: (e: MouseEvent) => void;
    private mouseMove: (e: MouseEvent) => void;
    private mouseUp: (e: MouseEvent) => void;

    private touchStart: (e: TouchEvent) => void;
    private touchMove: (e: TouchEvent) => void;
    private touchEnd: (e: TouchEvent) => void;

    constructor(controller: CameraController) {
        this._controller = controller;

        this.contextmenu = (e: MouseEvent): boolean => {
            e.preventDefault();
            return false;
        };
        this.wheel = (e: WheelEvent): void => {
            e.preventDefault();
        };

        this.mouseDown = (e: MouseEvent): void => {
            e.preventDefault();
        };
        this.mouseMove = (e: MouseEvent): void => {
            e.preventDefault();
        };
        this.mouseUp = (e: MouseEvent): void => {
            e.preventDefault();
        };

        this.touchStart = (e: TouchEvent): void => {
            e.preventDefault();
        };
        this.touchMove = (e: TouchEvent): void => {
            e.preventDefault();
        };
        this.touchEnd = (e: TouchEvent): void => {
            e.preventDefault();
        };
    }

    attach(element: HTMLElement): void {
        element.addEventListener('contextmenu', this.contextmenu);
        element.addEventListener('wheel', this.wheel);

        element.addEventListener('mousedown', this.mouseDown);
        element.addEventListener('mousemove', this.mouseMove);
        element.addEventListener('mouseup', this.mouseUp);

        element.addEventListener('touchmove', this.touchMove);
        element.addEventListener('touchstart', this.touchStart);
        element.addEventListener('touchend', this.touchEnd);
    }

    detach(element: HTMLElement): void {
        element.removeEventListener('contextmenu', this.contextmenu);
        element.removeEventListener('wheel', this.wheel);

        element.removeEventListener('mousedown', this.mouseDown);
        element.removeEventListener('mousemove', this.mouseMove);
        element.removeEventListener('mouseup', this.mouseUp);

        element.removeEventListener('touchmove', this.touchMove);
        element.removeEventListener('touchstart', this.touchStart);
        element.removeEventListener('touchend', this.touchEnd);
    }
}
