import { AmbientLight, BoxBufferGeometry, DirectionalLight, Mesh, MeshPhongMaterial, Scene } from 'three';
export default class GameScene {
    private _scene: Scene = new Scene();

    public createTestScene() {
        const ambLight = new AmbientLight(0xffffff, 0.3);

        const dirLight = new DirectionalLight(0xffffff, 1);
        dirLight.position.set(0, 5, 0);
        dirLight.lookAt(0, 0, 0);

        const box = new Mesh(new BoxBufferGeometry(1, 1, 1), new MeshPhongMaterial({ color: 0xffffff }));
        box.position.set(0, -0.5, 0);
        this._scene.add(ambLight, dirLight, box);
    }

    public getThreeScene(): Scene {
        return this._scene;
    }
}
