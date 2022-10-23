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

    public updateLoop = (time: number): void => {
        this._mainScene.update(time);
        return;
    };

    public tickLoop = (time: number): void => {
        return;
    };

    public addObject(point: { x: number; y: number; z: number }) {
        // this._mainScene.addBox(point);
    }

    get hitboxes() {
        return this._mainScene.hitboxes;
    }
}
