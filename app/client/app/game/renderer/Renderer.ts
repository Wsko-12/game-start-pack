import { WebGLRenderer } from 'three';
import GameUI from '../ui/GameUI';
import World from '../world/World';
import GameCamera from './gameCamera/GameCamera';

export default class Renderer {
    private static renderer: WebGLRenderer | null = null;
    private static camera: GameCamera | null = null;

    static init() {
        const canvas = GameUI.getCanvas();
        GameCamera.init();

        const renderer = new WebGLRenderer({
            canvas,
        });
        this.renderer = renderer;

        renderer.setClearColor(0x00ffff);

        window.addEventListener('resize', this.setSize);
        this.setSize();
        this.render();
    }

    private static setSize = () => {
        console.log('resize');
        const windowPixelRatio = 1;
        const windowWidth = +window.innerWidth * windowPixelRatio;
        const windowHeight = +window.innerHeight * windowPixelRatio;

        const renderer = this.renderer;

        if (!renderer) {
            console.error('[Renderer setSize] renderer undefined');
            return;
        }

        renderer.setSize(windowWidth, windowHeight, false);
        renderer.setPixelRatio(windowPixelRatio);

        const canvas = GameUI.getCanvas();

        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';

        const camera = GameCamera.getCamera();

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // if (this._postprocessorManager) {
        //     this._postprocessorManager.setSize(windowWidth, windowHeight);
        // }
    };

    static dispose() {
        document.removeEventListener('resize', this.setSize);
        this.renderer?.dispose();
    }

    static render() {
        this.renderer?.render(World.getScene(), GameCamera.getCamera());
    }
}
