import AppView from '../view/AppView';
import Geometries from './geometries/Geometries';
import Textures from './textures/Textures';

class Assets {
    private static _instance: Assets;
    public static get i() {
        return this._instance;
    }

    textures: Textures = new Textures();
    geometries: Geometries = new Geometries();
    constructor() {
        if (!Assets._instance) Assets._instance = this;
        return Assets._instance;
    }
    load(callback: () => void) {
        const loadingProgress = AppView.i.loadingProgress;
        this.textures.load(loadingProgress).then(() => {
            this.geometries.load(loadingProgress).then(callback);
        });
    }
}

export default Assets;
