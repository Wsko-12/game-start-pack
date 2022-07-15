import CameraController from '../CameraController';
import OrbitController from './OrbitController';

export default class CameraEventsHandler {
    private _controller: OrbitController;
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

    private _eventHandler: HTMLElement | null = null;

    private contextmenu: (e: MouseEvent) => boolean;
    private wheel: (e: WheelEvent) => void;

    private mouseDown: (e: MouseEvent) => void;
    private mouseMove: (e: MouseEvent) => void;
    private mouseUp: (e: MouseEvent) => void;

    private touchStart: (e: TouchEvent) => void;
    private touchMove: (e: TouchEvent) => void;
    private touchEnd: (e: TouchEvent) => void;

    constructor(controller: OrbitController) {
        this._controller = controller;

        this.contextmenu = (e: MouseEvent): boolean => {
            e.preventDefault();
            return false;
        };
        this.wheel = (e: WheelEvent): void => {
            /*
                deltaY = -100 zoom in
                deltaY = 100 zoom out

                deltaY int + move target back
                deltaY int - move target front

                deltaY float + zoom out
                deltaY float - zoom in


                deltaX int + move target right
                deltaX int - move target left
            */
            const { deltaX, deltaY } = e;

            if (deltaY !== 0) {
                if (deltaY % 1 === 0) {
                    if (deltaY === 100 || deltaY === -100) {
                        if (deltaY > 0) {
                            console.log('zoom out');
                        } else {
                            console.log('zoom in');
                        }
                    } else {
                        if (deltaY > 0) {
                            this._controller.targetDirection.front += Math.abs(e.deltaY);
                            // console.log('move target front', e.deltaY);
                        } else {
                            this._controller.targetDirection.front -= Math.abs(e.deltaY);
                            // console.log('move target back', e.deltaY);
                        }
                    }
                } else {
                    //pitch
                    if (deltaY > 0) {
                        console.log('zoom out', e.deltaY);
                    } else {
                        console.log('zoom in', e.deltaY);
                    }
                }
            }

            if (deltaX !== 0) {
                if (deltaX > 0) {
                    this._controller.targetDirection.left += Math.abs(e.deltaX);
                    // console.log('target right');
                } else {
                    this._controller.targetDirection.left -= Math.abs(e.deltaX);
                    // console.log('target left');
                }
            }
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
        this._eventHandler = element;
        this._eventHandler.addEventListener('contextmenu', this.contextmenu);
        this._eventHandler.addEventListener('wheel', this.wheel);

        this._eventHandler.addEventListener('mousedown', this.mouseDown);
        this._eventHandler.addEventListener('mousemove', this.mouseMove);
        this._eventHandler.addEventListener('mouseup', this.mouseUp);

        this._eventHandler.addEventListener('touchmove', this.touchMove);
        this._eventHandler.addEventListener('touchstart', this.touchStart);
        this._eventHandler.addEventListener('touchend', this.touchEnd);
    }

    detach(): void {
        if (this._eventHandler) {
            this._eventHandler.removeEventListener('contextmenu', this.contextmenu);
            this._eventHandler.removeEventListener('wheel', this.wheel);

            this._eventHandler.removeEventListener('mousedown', this.mouseDown);
            this._eventHandler.removeEventListener('mousemove', this.mouseMove);
            this._eventHandler.removeEventListener('mouseup', this.mouseUp);

            this._eventHandler.removeEventListener('touchmove', this.touchMove);
            this._eventHandler.removeEventListener('touchstart', this.touchStart);
            this._eventHandler.removeEventListener('touchend', this.touchEnd);
        }
    }
}
