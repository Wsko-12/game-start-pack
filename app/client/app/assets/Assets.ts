import Geometries from './geometries/Geometries';
import Textures from './textures/Textures';

class Assets {
    private static _instance: Assets;
    public static get i() {
        return this._instance;
    }
    textures: Textures;
    geometries: Geometries;
    constructor() {
        this.textures = new Textures();
        this.geometries = new Geometries();
        if (!Assets._instance) Assets._instance = this;
        return Assets._instance;
    }
    load() {
        this.textures.load().then(() => {
            this.geometries.load().then(() => {
                console.log(this);
            });
        });
    }
}

export default Assets;
