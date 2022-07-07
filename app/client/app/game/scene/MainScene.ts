import { Scene } from 'three';
export default class MainScene {
    private static _instance: MainScene;
    private _scene: Scene = new Scene();
    constructor() {
        if (!MainScene._instance) MainScene._instance = this;
    }

    public getThreeScene(): Scene {
        return this._scene;
    }
}
