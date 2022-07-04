import * as THREE from 'three';
import { AtlasItem } from '../../../../interface/interface';
import { textureAtlas } from './atlas';
class Textures {
    private _loaded: { [key: string]: THREE.Texture };
    constructor() {
        this._loaded = {};
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
