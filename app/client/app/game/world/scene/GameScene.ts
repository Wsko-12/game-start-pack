import { Scene } from 'three';
export default class GameScene {
    private _scene: Scene = new Scene();

    public getThreeScene(): Scene {
        return this._scene;
    }
}
