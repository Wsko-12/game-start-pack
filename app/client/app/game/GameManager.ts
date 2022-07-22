import GameInterface from './interface/GameInterface';
import Loop from './loop/Loop';
import World from './world/World';

export default class GameManager {
    private _world = new World();
    private _interface = new GameInterface();
    private _loops = {
        paused: false,
        timestamp: 0,
        render: new Loop(60, (time) => {
            this._interface.renderLoop(time);
        }),
        update: new Loop(40, (time) => {
            this._interface.updateLoop(time);
            this._world.updateLoop(time);
        }),
        tick: new Loop(1, (time) => {
            this._world.tickLoop(time);
        }),
    };

    public start(): void {
        this.setDevFunctions();
        this._world.loadAssets(() => {
            const gameScene = this._world.getMainScene();
            this._interface.setRenderScene(gameScene);
            this._interface.buildToDocument();

            this._loops.render.switcher(true);
            this._loops.update.switcher(true);
            this._loops.tick.switcher(true);
            this._loops.timestamp = Date.now();
            this.loop();

            this._world.createTestWorld();
        });
    }

    private loop = (): void => {
        const now = Date.now();
        const delta = (now - this._loops.timestamp) * 0.001;
        this._loops.timestamp = now;
        const { render, update, tick } = this._loops;
        render.play(delta);
        update.play(delta);
        tick.play(delta);
        if (!this._loops.paused) {
            requestAnimationFrame(this.loop);
        }
    };

    private setDevFunctions() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(globalThis as any).$dev) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (globalThis as any).$dev = {};
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (globalThis as any).$dev.render = {
            showStats: (value: boolean) => {
                this._interface.statsSwitcher(value);
            },
            pauseAllLoops: (value: boolean) => {
                this._loops.paused = value;
                if (!value) this.loop();
            },
            pauseRender: (value: boolean) => {
                this._loops.render.switcher(!value);
            },
            pauseUpdate: (value: boolean) => {
                this._loops.update.switcher(!value);
            },
            pauseTick: (value: boolean) => {
                this._loops.tick.switcher(!value);
            },
            setRenderFPS: (fps: number) => {
                this._loops.render.setFps(fps);
            },
            setUpdateFPS: (fps: number) => {
                this._loops.update.setFps(fps);
            },
            setTickFPS: (fps: number) => {
                this._loops.tick.setFps(fps);
            },
        };
    }
}
