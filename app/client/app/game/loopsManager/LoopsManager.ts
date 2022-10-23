import Loop, { TLoopCallback } from './loop/Loop';

export type TGameLoopName = 'render' | 'update';

export default class LoopsManager {
    private static loops: Record<TGameLoopName, Loop> | null = null;

    private static timestamp = 0;
    private static paused = true;

    static init() {
        this.loops = {
            render: new Loop(60),
            update: new Loop(45),
        };
    }

    static start() {
        this.paused = false;
        this.play();
    }

    static stop() {
        this.paused = true;
    }

    static subscribe(loop: TGameLoopName, callback: TLoopCallback) {
        if (!this.loops) {
            throw new Error('[LoopsManager] loops undefined. First init LoopsManager');
        }
        this.loops[loop].subscribe(callback);
    }

    static unsubscribe(loop: TGameLoopName, callback: TLoopCallback) {
        if (!this.loops) {
            throw new Error('[LoopsManager] loops undefined. First init LoopsManager');
        }
        this.loops[loop].unsubscribe(callback);
    }

    private static play = () => {
        if (!this.loops) {
            throw new Error('[LoopsManager] loops undefined. First init LoopsManager');
        }

        const now = Date.now();
        const delta = (now - this.timestamp) * 0.001;
        this.timestamp = now;

        this.loops.render.play(delta);
        this.loops.update.play(delta);

        if (!this.paused) {
            requestAnimationFrame(this.play);
        }
    };
}
