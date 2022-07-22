import { AmbientLight, BoxBufferGeometry, DirectionalLight, Mesh, MeshPhongMaterial, Scene } from 'three';
import HitboxScene from './hitboxScene/HitboxScene';

export default class GameScene {
    private _scene: Scene = new Scene();
    private _hitBoxesScene = new HitboxScene();

    public createTestScene() {
        const ambLight = new AmbientLight(0xffffff, 0.3);

        const dirLight = new DirectionalLight(0xffffff, 1);
        dirLight.position.set(0, 5, 0);
        dirLight.lookAt(0, 0, 0);

        const box = new Mesh(new BoxBufferGeometry(1, 1, 1), new MeshPhongMaterial({ color: 0xffffff }));
        this._hitBoxesScene.add(box);
        box.position.set(0, -0.5, 0);
        this._scene.add(ambLight, dirLight, box);
    }

    public getThreeScene(): Scene {
        return this._scene;
    }

    public addBox(point: { x: number; y: number; z: number }) {
        const box = new Mesh(new BoxBufferGeometry(0.05, 0.05, 0.05), new MeshPhongMaterial({ color: 0xff0000 }));
        this._hitBoxesScene.add(box);
        this._scene.add(box);

        box.position.set(point.x, point.y, point.z);
    }

    get hitboxes() {
        return this._hitBoxesScene;
    }
}
