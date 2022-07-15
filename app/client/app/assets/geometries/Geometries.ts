import * as THREE from 'three';
import { geometriesAtlas } from './atlas';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AtlasItem } from '../../../../ts/interfaces';
import LoadingPage from '../../common/LoadingPage/LoadingPage';

class Geometries {
    private static _instance: Geometries;
    public static get i() {
        return this._instance;
    }

    private _loaded: { [key: string]: THREE.BufferGeometry } = {};
    constructor() {
        if (!Geometries._instance) Geometries._instance = this;
        return Geometries._instance;
    }

    load(loading: LoadingPage): Promise<boolean> {
        loading.start(geometriesAtlas.length);
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
export default Geometries;
