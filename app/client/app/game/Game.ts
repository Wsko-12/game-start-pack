import { Clock } from 'three';
import Assets from '../assets/Assets';
import MainCamera from './camera/MainCamera';
import Loop from './loop/Loop';
import Renderer from './renderer/Renderer';
import MainScene from './scene/MainScene';
import './style.scss';
export default class Game {
    private _mainRenderer: Renderer = new Renderer();
    private _assets: Assets = new Assets();
    private _mainScene: MainScene = new MainScene();
    private _mainCamera: MainCamera = new MainCamera();
    private _clock: Clock = new Clock();
    private _loops = {
        paused: false,
        renderLoop: new Loop(60, this._mainRenderer.render, true),
        animationLoop: new Loop(30, undefined, true),
        tickLoop: new Loop(1, undefined, true),
    };

    private static _instance: Game;
    constructor() {
        if (!Game._instance) Game._instance = this;
        return Game._instance;
    }

    start() {
        this._assets.load(() => {
            this.appendCanvas();
            this._clock.start();

            this.setUpRenderer();
            this.setUpMainCamera();
            this.setDevFunctions();

            this.loop();
        });
    }

    private setUpRenderer() {
        this._mainRenderer.setScene(this._mainScene.getThreeScene());
        this._mainRenderer.setCamera(this._mainCamera.getThreeCamera());
    }

    private setUpMainCamera() {
        this._mainCamera.setController('orbit');
        this._loops.animationLoop.addCallback(() => {
            this._mainCamera.update();
        });
    }

    private appendCanvas() {
        document.body.innerHTML = '';
        const canvas = this._mainRenderer.getCanvas();
        canvas.id = 'mainCanvas';
        document.body.append(canvas);
    }

    private loop = () => {
        const delta = this._clock.getDelta();
        const { renderLoop, animationLoop, tickLoop } = this._loops;
        renderLoop.play(delta);
        animationLoop.play(delta);
        tickLoop.play(delta);
        if (!this._loops.paused) {
            requestAnimationFrame(this.loop);
        }
    };

    private setDevFunctions() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).$dev = {
            showStats: (value: boolean) => {
                this._mainRenderer.statsSwitcher(value);
            },
            pauseAllLoops: (value: boolean) => {
                this._loops.paused = value;
                if (!value) this.loop();
            },
            pauseRender: (value: boolean) => {
                this._loops.renderLoop.switcher(!value);
            },
            pauseAnimation: (value: boolean) => {
                this._loops.animationLoop.switcher(!value);
            },
            pauseTick: (value: boolean) => {
                this._loops.tickLoop.switcher(!value);
            },
            setRenderFPS: (fps: number) => {
                this._loops.renderLoop.setFps(fps);
            },
            setAnimationFPS: (fps: number) => {
                this._loops.animationLoop.setFps(fps);
            },
            setTickFPS: (fps: number) => {
                this._loops.tickLoop.setFps(fps);
            },
        };
    }
}
