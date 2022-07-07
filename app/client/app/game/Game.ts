import Assets from '../assets/Assets';
import MainCamera from './camera/MainCamera';
import Renderer from './renderer/Renderer';
import MainScene from './scene/MainScene';
import './style.scss';
export default class Game {
    private _mainRenderer: Renderer = new Renderer();
    private _assets: Assets = new Assets();
    private _mainScene: MainScene = new MainScene();
    private _mainCamera: MainCamera = new MainCamera();

    private static _instance: Game;
    constructor() {
        if (!Game._instance) Game._instance = this;
        return Game._instance;
    }

    start() {
        this._assets.load(() => {
            console.log('[Assets] ', this._assets);
            this.appendCanvas();

            this._mainCamera.setMouseEventsHandler(this._mainRenderer.getCanvas());
            this._mainRenderer.setScene(this._mainScene.getThreeScene());
            this._mainRenderer.setCamera(this._mainCamera.getThreeCamera());
        });
    }

    private appendCanvas() {
        document.body.innerHTML = '';
        const canvas = this._mainRenderer.getCanvas();
        canvas.id = 'mainCanvas';
        document.body.append(canvas);
    }
}
