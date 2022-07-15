import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import PageBuilder from '../../../common/PageBuilder';
import './style.scss';
export default class Render {
    public readonly id: string = Math.random().toString();
    private _canvas: HTMLCanvasElement;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera | null = null;
    private _scene: Scene | null = null;
    constructor() {
        this._canvas = <HTMLCanvasElement>PageBuilder.createElement('canvas', {
            id: 'renderer',
            classes: 'canvas',
        });
        this._renderer = new WebGLRenderer({
            canvas: this._canvas,
        });

        window.addEventListener('resize', () => {
            this.setSize();
        });
    }

    public resize(): void {
        this.setSize();
    }

    public setCamera(camera: PerspectiveCamera): void {
        this._camera = camera;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._renderer.domElement = this._canvas;
    }

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public setScene(scene: Scene) {
        this._scene = scene;
    }

    public render = (): void => {
        if (this._scene && this._camera) {
            this._renderer.render(this._scene, this._camera);
        }
    };

    private setSize(): void {
        const windowPixelRatio = Math.min(window.devicePixelRatio, 2);
        const windowWidth = +window.innerWidth * windowPixelRatio;
        const windowHeight = +window.innerHeight * windowPixelRatio;

        this._renderer.setSize(windowWidth, windowHeight, false);
        this._renderer.setPixelRatio(windowPixelRatio);

        this._canvas.style.width = window.innerWidth + 'px';
        this._canvas.style.height = window.innerHeight + 'px';

        if (this._camera) {
            this._camera.aspect = windowWidth / windowHeight;
            this._camera.updateProjectionMatrix();
        }
        // if(this.composer){
        //     this.composer.setSize(windowWidth, windowHeight);
        // }
    }
}
