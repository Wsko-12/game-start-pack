import { Scene } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import GameCamera from './camera/GameCamera';
import Render from './render/Render';
import View from './view/View';

export default class GameInterface {
    private _render = new Render();
    private _camera = new GameCamera();
    private _view = new View();
    private _stats = Stats();

    constructor() {
        this._render.setCamera(this._camera.getThreeCamera());
        this._view.appendCanvas(this._render.getCanvas());
    }

    public setRenderScene(scene: Scene): void {
        this._render.setScene(scene);
    }

    public setGameSceneToRender(scene: Scene) {
        this._render.setScene(scene);
    }

    public buildToDocument() {
        this._view.buildToDocument();
        this._render.resize();
    }

    public renderLoop = (time: number): void => {
        this._stats.update();
        this._render.render();
    };

    public statsSwitcher(turnOn: boolean) {
        if (turnOn) {
            document.body.appendChild(this._stats.dom);
        } else {
            this._stats.dom.remove();
        }
    }

    public updateLoop = (time: number): void => {
        this._camera.update(time);
    };
}
