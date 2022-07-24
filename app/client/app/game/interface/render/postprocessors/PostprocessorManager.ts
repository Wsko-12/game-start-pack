import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import CartoonOutline from './CartoonOutline/CartoonOutline';

export default class PostprocessorManager {
    private _composer: EffectComposer;
    private _camera: PerspectiveCamera | null = null;
    private _scene: Scene | null = null;
    private _disabled = false;
    private _renderPass: RenderPass | null = null;
    private _passes: { [key: string]: Pass } = {};

    constructor(renderer: WebGLRenderer) {
        this._composer = new EffectComposer(renderer);
        this.setDevFunctions();
    }

    public setSize(width: number, height: number) {
        this._composer.setSize(width, height);
    }

    public isDisabled() {
        return this._disabled;
    }

    public setCamera(camera: PerspectiveCamera): void {
        this._camera = camera;
        this.createRenderPass();
    }

    public setScene(scene: Scene) {
        this._scene = scene;
        this.createRenderPass();
    }

    public render() {
        if (this._scene && this._camera) {
            this._composer.render();
        }
    }

    private createRenderPass() {
        if (this._scene && this._camera && !this._renderPass) {
            this._renderPass = new RenderPass(this._scene, this._camera);
            this._composer.addPass(this._renderPass);

            this._passes.cartoonOutline = new CartoonOutline(
                {
                    color: new Color(0x303030),
                    size: 1,
                    difference: 2000,
                },
                this._scene,
                this._camera
            );

            this._composer.addPass(this._passes.cartoonOutline);
        }
    }

    private setDevFunctions() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(globalThis as any).$dev) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (globalThis as any).$dev = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).$dev.postprocessing = {
            disable: (value: boolean) => {
                this._disabled = value;
            },

            getPasses: () => this._passes,
        };
    }
}
