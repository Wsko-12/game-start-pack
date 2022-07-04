import * as THREE from 'three';
import { AtlasItem } from '../../../../interface/interface';
import { textureAtlas } from './atlas';
class Textures {
    private static _instance: Textures;
    public static get i() {
        return this._instance;
    }

    private _loaded: { [key: string]: THREE.Texture } = {};
    constructor() {
        if (!Textures._instance) Textures._instance = this;
        return Textures._instance;
    }
    load(): Promise<boolean> {
        return new Promise((res) => {
            const loader = new THREE.TextureLoader();
            let index = 0;
            const load = () => {
                if (textureAtlas[index]) {
                    const data: AtlasItem = textureAtlas[index];
                    const path: string = './assets/textures/' + data.folder + '/' + data.file;
                    loader.load(path, (texture) => {
                        texture.flipY = false;
                        this._loaded[data.name] = texture;
                        index++;
                        load();
                    });
                } else {
                    res(true);
                }
            };
            load();
        });
    }
}
export default Textures;
