import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import AppView from '../../view/AppView';
import './style.scss';
export default class Renderer {
    public readonly id: string = Math.random().toString();
    private _canvas: HTMLCanvasElement;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera | null = null;
    private _scene: Scene | null = null;
    private _stopped = false;
    constructor() {
        this._canvas = new AppView().createElement('canvas', {
            id: 'renderer',
            classes: 'canvas',
        }) as HTMLCanvasElement;
        this._renderer = new WebGLRenderer({
            canvas: this._canvas,
        });

        document.addEventListener('resize', () => {
            this.setSize();
        });
    }
    public setCamera(camera: PerspectiveCamera) {
        this._camera = camera;
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._renderer.domElement = this._canvas;
    }

    public setScene(scene: Scene) {
        this._scene = scene;
    }

    public startRender() {
        this._stopped = false;
        this.render();
    }
    public stopRender() {
        this._stopped = true;
    }

    public getCanvas() {
        return this._canvas;
    }

    private render() {
        if (!this._stopped && this._scene && this._camera) {
            this._renderer.render(this._scene, this._camera);
            requestAnimationFrame(() => {
                this.render();
            });
        }
    }

    private setSize() {
        const windowPixelRatio = Math.min(window.devicePixelRatio, 2);
        const windowWidth = +window.innerWidth * windowPixelRatio;
        const windowHeight = +window.innerHeight * windowPixelRatio;

        this._renderer.setSize(windowWidth, windowHeight, false);
        this._renderer.setPixelRatio(windowPixelRatio);

        if (this._camera) {
            this._camera.aspect = windowWidth / windowHeight;
            this._camera.updateProjectionMatrix();
        }
        // if(this.composer){
        //     this.composer.setSize(windowWidth, windowHeight);
        // }
    }
}
