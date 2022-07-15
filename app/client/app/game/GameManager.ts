import { Clock } from 'three';
import GameInterface from './interface/GameInterface';
import Loop from './loop/Loop';
import World from './world/World';

export default class GameManager {
    private _world = new World();
    private _interface = new GameInterface();
    private _clock = new Clock();
    private _loops = {
        paused: false,
        render: new Loop(60, () => {
            this._interface.renderLoop();
        }),
        update: new Loop(40, () => {
            this._interface.updateLoop();
            this._world.updateLoop();
        }),
        tick: new Loop(1, () => {
            this._world.tickLoop();
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
            this.loop();
        });
    }

    private loop = (): void => {
        const delta = this._clock.getDelta();
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
        (globalThis as any).$dev = {
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
