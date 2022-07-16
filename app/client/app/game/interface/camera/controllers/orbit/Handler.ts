import { Vector2 } from 'three';
import { Point2 } from '../../../../../common/geometry/Geometry';
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
            flag: false,
            moved: false,
            timestamp: 0,
        },
        context: {
            x: 0,
            y: 0,
            flag: false,
            moved: false,
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
            e.preventDefault();
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
                        this._controller.targetDirection.deltaY += (-e.deltaY / window.innerHeight) * 0.25;
                    }
                } else {
                    //pitch
                    this._controller.zoom.delta += deltaY * this._controller.speed * 0.01;
                }
            }

            if (deltaX !== 0) {
                this._controller.targetDirection.deltaX += (-e.deltaX / window.innerWidth) * 0.25;
            }
        };

        this.mouseDown = (e: MouseEvent): void => {
            e.preventDefault();
            if (e.button === 0) {
                this._mouse.clicked.x = e.clientX;
                this._mouse.clicked.y = e.clientY;
                this._mouse.clicked.flag = true;
                this._mouse.clicked.timestamp = e.timeStamp;
            }
            if (e.button === 2) {
                this._mouse.context.x = e.clientX;
                this._mouse.context.y = e.clientY;
                this._mouse.context.flag = true;
                this._mouse.context.timestamp = e.timeStamp;
            }
        };

        this.mouseMove = (e: MouseEvent): void => {
            e.preventDefault();
            this._mouse.x = e.clientX;
            this._mouse.y = e.clientY;

            if (this._mouse.clicked.flag) {
                let deltaX = e.clientX - this._mouse.clicked.x;
                let deltaY = e.clientY - this._mouse.clicked.y;

                this._mouse.clicked.x = e.clientX;
                this._mouse.clicked.y = e.clientY;

                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    this._mouse.clicked.moved = true;
                }

                deltaX /= window.innerWidth;
                deltaY /= window.innerHeight;

                this._controller.targetDirection.deltaX = deltaX * this._controller.speed;
                this._controller.targetDirection.deltaY = deltaY * this._controller.speed;
            }

            if (this._mouse.context.flag) {
                this._mouse.context.moved = true;

                let deltaX = e.clientX - this._mouse.context.x;
                let deltaY = e.clientY - this._mouse.context.y;

                this._mouse.context.x = e.clientX;
                this._mouse.context.y = e.clientY;

                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    this._mouse.context.moved = true;
                }

                deltaX /= window.innerWidth;
                deltaY /= window.innerHeight;

                this._controller.cameraAngles.deltaAlpha += deltaX * this._controller.speed;
                this._controller.cameraAngles.deltaTetha += deltaY * this._controller.speed;
            }
        };

        this.mouseUp = (e: MouseEvent): void => {
            e.preventDefault();
            if (e.button === 0) {
                if (e.timeStamp - this._mouse.clicked.timestamp < 100 && !this._mouse.clicked.moved) {
                    console.log('click');
                }
                this._mouse.clicked.flag = false;
                this._mouse.clicked.moved = false;
            }
            if (e.button === 2) {
                if (e.timeStamp - this._mouse.context.timestamp < 100 && !this._mouse.context.moved) {
                    console.log('context click');
                }
                this._mouse.context.flag = false;
                this._mouse.context.moved = false;
            }
            if (e.type === 'mouseleave') {
                this._mouse.clicked.flag = false;
                this._mouse.context.flag = false;
            }
        };

        this.touchStart = (e: TouchEvent): void => {
            e.preventDefault();
            this._touch.x = e.touches[0].clientX;
            this._touch.y = e.touches[0].clientY;
            if (e.touches.length === 1) {
                this._touch.clicked = true;
                this._touch.double = false;
            }
            if (e.touches.length > 1) {
                this._touch.clicked = false;
                this._touch.double = true;
                this._touch.x2 = e.touches[1].clientX;
                this._touch.y2 = e.touches[1].clientY;
            }
        };
        this.touchMove = (e: TouchEvent): void => {
            e.preventDefault();

            if (this._touch.clicked) {
                let deltaX = e.touches[0].clientX - this._touch.x;
                let deltaY = e.touches[0].clientY - this._touch.y;

                this._touch.x = e.touches[0].clientX;
                this._touch.y = e.touches[0].clientY;

                if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
                    this._mouse.clicked.moved = true;
                }

                deltaX /= window.innerWidth;
                deltaY /= window.innerHeight;

                this._controller.targetDirection.deltaX = deltaX * this._controller.speed * 1.5;
                this._controller.targetDirection.deltaY = deltaY * this._controller.speed * 1.5;
            }
            if (this._touch.double) {
                const vectorA = new Vector2(
                    e.touches[0].clientX - this._touch.x,
                    e.touches[0].clientY - this._touch.y
                ).normalize();
                const vectorB = new Vector2(
                    e.touches[1].clientX - this._touch.x2,
                    e.touches[1].clientY - this._touch.y2
                ).normalize();

                const dot = vectorA.dot(vectorB);
                if (dot < 0.75) {
                    //pitch
                    const pointABefore = new Point2(this._touch.x, this._touch.y);
                    const pointAAfter = new Point2(e.touches[0].clientX, e.touches[0].clientY);

                    const pointBBefore = new Point2(this._touch.x2, this._touch.y2);
                    const pointBAfter = new Point2(e.touches[1].clientX, e.touches[1].clientY);

                    const distanceBefore = pointABefore.getDistanceTo(pointBBefore);
                    const distanceAfter = pointAAfter.getDistanceTo(pointBAfter);

                    const delta = distanceAfter - distanceBefore;
                    this._controller.zoom.delta += -delta / Math.max(window.innerWidth, window.innerHeight);
                } else {
                    let deltaX = (e.touches[1].clientX - this._touch.x2) | (e.touches[0].clientX - this._touch.x);
                    let deltaY = (e.touches[1].clientY - this._touch.y2) | (e.touches[0].clientY - this._touch.y);

                    deltaX /= window.innerWidth;
                    deltaY /= window.innerHeight;

                    this._controller.cameraAngles.deltaAlpha += deltaX * this._controller.speed;
                    this._controller.cameraAngles.deltaTetha += deltaY * this._controller.speed;
                }

                this._touch.x = e.touches[0].clientX;
                this._touch.y = e.touches[0].clientY;
                this._touch.x2 = e.touches[1].clientX;
                this._touch.y2 = e.touches[1].clientY;
            }
        };
        this.touchEnd = (e: TouchEvent): void => {
            e.preventDefault();
            this._touch.x = e.touches[0].clientX;
            this._touch.y = e.touches[0].clientY;
            if (e.touches.length === 0) {
                this._touch.clicked = false;
                this._touch.double = false;
            } else if (e.touches.length === 1) {
                this._touch.clicked = true;
                this._touch.double = false;
            } else {
                this._touch.clicked = false;
                this._touch.double = true;
                this._touch.x2 = e.touches[1].clientX;
                this._touch.y2 = e.touches[1].clientY;
            }
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
    }
}
