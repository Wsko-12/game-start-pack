import { Scene } from 'three';
import Assets from '../../assets/Assets';
import GameScene from './scene/GameScene';

export default class World {
    private _mainScene = new GameScene();
    private _assets = new Assets();

    public createTestWorld() {
        this._mainScene.createTestScene();
    }

    public loadAssets(callback: () => void) {
        this._assets.load(callback);
    }

    public getMainScene(): Scene {
        return this._mainScene.getThreeScene();
    }

    public updateLoop = (): void => {
        return;
    };

    public tickLoop = (): void => {
        return;
    };
}
