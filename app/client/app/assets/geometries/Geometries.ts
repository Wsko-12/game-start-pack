import * as THREE from 'three';
import { AtlasItem } from '../../../../interface/interface';
import { geometriesAtlas } from './atlas';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class Textures {
    private _loaded: { [key: string]: THREE.BufferGeometry };
    constructor() {
        this._loaded = {};
    }
    load(): Promise<boolean> {
        return new Promise((res) => {
            const loader = new GLTFLoader();
            let index = 0;
            const load = () => {
                if (geometriesAtlas[index]) {
                    const data: AtlasItem = geometriesAtlas[index];
                    const path: string = './assets/geometries/' + data.folder + data.file;
                    loader.load(path, (model) => {
                        const mesh = model.scene.children[0] as THREE.Mesh;
                        this._loaded[data.name] = mesh.geometry;
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
