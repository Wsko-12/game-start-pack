import OrbitController from './OrbitController';

export default class CameraEventsHandler {
    private _controller: OrbitController;
    private _time = 0;
    private _mouse = {
        x: 0,
        y: 0,
        clicked: {
            x: 0,
            y: 0,
            lastDelta: {
                x: 0,
                y: 0,
            },
            flag: false,
            timestamp: 0,
        },
        context: {
            x: 0,
            y: 0,
            lastDelta: {
                x: 0,
                y: 0,
            },
            flag: false,
            timestamp: 0,
        },
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
                            this._controller.zoom.delta += 0.1 * this._controller.speed;
                        } else {
                            this._controller.zoom.delta -= 0.1 * this._controller.speed;
                        }
                    } else {
                        if (deltaY > 0) {
                            // this._controller.targetDirection.deltaY += Math.abs(e.deltaY);
                            // console.log('move target front', e.deltaY);
                        } else {
                            // this._controller.targetDirection.deltaY -= e.deltaY;
                            // console.log('move target back', e.deltaY);
                        }
                    }
                } else {
                    //pitch
                    if (deltaY > 0) {
                        this._controller.zoom.delta += 0.05 * this._controller.speed;
                    } else {
                        this._controller.zoom.delta -= 0.05 * this._controller.speed;
                    }
                }
            }

            if (deltaX !== 0) {
                if (deltaX > 0) {
                    // this._controller.targetDirection.left -= Math.abs(e.deltaX);
                } else {
                    // this._controller.targetDirection.left += Math.abs(e.deltaX);
                }
            }
            e.preventDefault();
        };

        this.mouseDown = (e: MouseEvent): void => {
            if (e.button === 0) {
                this._mouse.clicked.x = e.clientX;
                this._mouse.clicked.y = e.clientY;
                this._mouse.clicked.flag = true;
                this._mouse.clicked.timestamp = this._time;
            }
            if (e.button === 2) {
                this._mouse.context.x = e.clientX;
                this._mouse.context.y = e.clientY;
                this._mouse.context.flag = true;
                this._mouse.context.timestamp = this._time;
            }
            e.preventDefault();
        };
        this.mouseMove = (e: MouseEvent): void => {
            this._mouse.x = e.clientX;
            this._mouse.y = e.clientY;

            if (this._mouse.clicked.flag) {
                let deltaX = e.clientX - this._mouse.clicked.x;
                let deltaY = e.clientY - this._mouse.clicked.y;

                this._mouse.clicked.x = e.clientX;
                this._mouse.clicked.y = e.clientY;

                deltaX /= window.innerWidth;
                deltaY /= window.innerHeight;

                this._controller.targetDirection.deltaX = deltaX * this._controller.speed;
                this._controller.targetDirection.deltaY = deltaY * this._controller.speed;
            }

            if (this._mouse.context.flag) {
                let deltaX = e.clientX - this._mouse.context.x;
                let deltaY = e.clientY - this._mouse.context.y;

                this._mouse.context.x = e.clientX;
                this._mouse.context.y = e.clientY;

                deltaX /= window.innerWidth;
                deltaY /= window.innerHeight;

                this._controller.cameraAngles.deltaAlpha += deltaX * this._controller.speed;
                this._controller.cameraAngles.deltaTetha += deltaY * this._controller.speed;
            }
            e.preventDefault();
        };
        this.mouseUp = (e: MouseEvent): void => {
            if (e.button === 0) {
                this._mouse.clicked.flag = false;
            }
            if (e.button === 2) {
                this._mouse.context.flag = false;
            }
            if (e.type === 'mouseleave') {
                this._mouse.clicked.flag = false;
                this._mouse.context.flag = false;
            }
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
        this._eventHandler.addEventListener('mouseleave', this.mouseUp);

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
            this._eventHandler.removeEventListener('mouseleave', this.mouseUp);

            this._eventHandler.removeEventListener('touchmove', this.touchMove);
            this._eventHandler.removeEventListener('touchstart', this.touchStart);
            this._eventHandler.removeEventListener('touchend', this.touchEnd);
        }
    }

    update(time: number) {
        this._time = time;
        // if (this._mouse.clicked.flag && this._time - this._mouse.clicked.timestamp > 0.5) {
        //     this._mouse.clicked.x = this._mouse.x;
        //     this._mouse.clicked.y = this._mouse.y;
        // }
    }
}
