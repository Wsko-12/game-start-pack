import * as THREE from 'three';
import { AtlasItem } from '../../../../ts/interfaces';
import LoadingPage from '../../common/LoadingPage/LoadingPage';
import { textureAtlas } from './atlas';
class Textures {
    private static _instance: Textures;
    public static get i() {
        return this._instance;
    }

    private _loaded: Record<string, THREE.Texture> = {};
    constructor() {
        if (!Textures._instance) Textures._instance = this;
        return Textures._instance;
    }

    get(name: string) {
        return this._loaded[name];
    }

    load(loading: LoadingPage): Promise<boolean> {
        loading.start(textureAtlas.length);
        return new Promise((res) => {
            const loader = new THREE.TextureLoader();
            let index = 0;
            const load = () => {
                if (textureAtlas[index]) {
                    const data: AtlasItem = textureAtlas[index];
                    const path: string = './assets/textures/' + data.folder + '/' + data.file;
                    loader.load(path, (texture) => {
                        texture.flipY = false;
                        texture.magFilter = THREE.NearestFilter;
                        this._loaded[data.name] = texture;
                        index++;
                        loading.tick(index);
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
