import App from '../App';
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
        this.textures.load().then(() => {
            this.geometries.load().then(callback);
        });
    }
}

export default Assets;
