import { LinearEncoding, PerspectiveCamera, Scene, VSMShadowMap, WebGLRenderer } from 'three';
import PageBuilder from '../../../common/PageBuilder';
import PostprocessorManager from './postprocessors/PostprocessorManager';

import './style.scss';
export default class Render {
    public readonly id: string = Math.random().toString();
    private _canvas: HTMLCanvasElement;
    private _renderer: WebGLRenderer;
    private _camera: PerspectiveCamera | null = null;
    private _scene: Scene | null = null;
    private _postprocessorManager: PostprocessorManager;

    constructor() {
        this._canvas = <HTMLCanvasElement>PageBuilder.createElement('canvas', {
            id: 'renderer',
            classes: 'canvas',
        });
        this._renderer = new WebGLRenderer({
            canvas: this._canvas,
            depth: true,
        });
        this._renderer.outputEncoding = LinearEncoding;

        this._renderer.setClearColor(0xeba2a2);
        this._postprocessorManager = new PostprocessorManager(this._renderer);
        this.enableShadow();
        window.addEventListener('resize', () => {
            this.setSize();
        });
    }

    public resize(): void {
        this.setSize();
    }

    private enableShadow() {
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = VSMShadowMap;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._renderer.domElement = this._canvas;
    }

    public getCanvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public setCamera(camera: PerspectiveCamera): void {
        this._camera = camera;
        this._postprocessorManager.setCamera(camera);
    }

    public setScene(scene: Scene) {
        this._scene = scene;
        this._postprocessorManager.setScene(scene);
    }

    public render = (): void => {
        if (this._scene && this._camera) {
            if (this._postprocessorManager.isDisabled()) {
                this._renderer.render(this._scene, this._camera);
            } else {
                this._postprocessorManager.render();
            }
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
            this._camera.aspect = window.innerWidth / window.innerHeight;
            this._camera.updateProjectionMatrix();
        }

        if (this._postprocessorManager) {
            this._postprocessorManager.setSize(windowWidth, windowHeight);
        }
    }
}
