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
    private _renderLoop: Loop = new Loop(60, this._mainRenderer.render, true);
    private _animationLoop: Loop = new Loop(30, undefined, true);
    private _tickLoop: Loop = new Loop(1, undefined, true);

    private static _instance: Game;
    constructor() {
        if (!Game._instance) Game._instance = this;
        return Game._instance;
    }

    start() {
        this._assets.load(() => {
            this.appendCanvas();

            this._mainRenderer.setScene(this._mainScene.getThreeScene());
            this._mainRenderer.setCamera(this._mainCamera.getThreeCamera());

            this._clock.start();

            this.loop();
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
        this._renderLoop.play(delta);
        this._animationLoop.play(delta);
        this._tickLoop.play(delta);
        requestAnimationFrame(this.loop);
    };
}
