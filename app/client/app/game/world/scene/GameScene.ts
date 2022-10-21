import {
    AmbientLight,
    BoxBufferGeometry,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    MeshToonMaterial,
    Scene,
} from 'three';
import Assets from '../../../assets/Assets';
import Grass from './Grass/Grass';
import HitboxScene from './hitboxScene/HitboxScene';

export default class GameScene {
    private _scene: Scene = new Scene();
    private _hitBoxesScene = new HitboxScene();

    public createTestScene() {
        const ambLight = new AmbientLight(0xffffff, 0.3);

        const dirLight = new DirectionalLight(0xffffff, 1);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        dirLight.shadow.camera.zoom = 0.8;
        dirLight.shadow.bias = -0.00001;
        dirLight.position.set(3, 5, 2);
        dirLight.lookAt(0, 0, 0);

        this._scene.add(ambLight, dirLight);

        this._scene.add(new Grass().getMesh());

        const groundTexture = new Assets().textures.get('ground');
        const ground = new Mesh(
            new BoxBufferGeometry(11.5, 2, 11.5),
            new MeshToonMaterial({ map: groundTexture, color: 0xaaaaaa })
        );

        ground.receiveShadow = true;
        ground.position.y = -1;
        this._scene.add(ground);

        const box = new Mesh(new BoxBufferGeometry(1, 1, 1), new MeshPhongMaterial());
        box.castShadow = true;
        box.receiveShadow = true;
        box.position.y = 0.5;
        this._scene.add(box);
    }

    public getThreeScene(): Scene {
        return this._scene;
    }

    get hitboxes() {
        return this._hitBoxesScene;
    }
}
