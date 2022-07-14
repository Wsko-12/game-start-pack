type callback = () => void;

export default class Loop {
    private _fps: number;
    private _oneFrameTime: number;
    private _callbacks: callback[] = [];
    private _paused = true;
    private _frame = 0;
    private _timestamp = 0;

    constructor(fps: number, callback?: callback, play = false) {
        this._fps = fps;
        this._oneFrameTime = 1 / fps;

        if (callback) {
            this.addCallback(callback);
        }

        this._paused = !play;
    }

    public setFps(fps: number) {
        this._oneFrameTime = 1 / fps;
        this._fps = fps;
    }

    public play(delta: number) {
        if (!this._paused) {
            this._timestamp += delta;
            if (this._timestamp > this._oneFrameTime) {
                this._frame++;
                this._timestamp = this._timestamp % this._oneFrameTime;
                this.call();
            }
        }
    }

    public getFrame() {
        return this._frame;
    }

    public switcher(turnOn: boolean) {
        this._paused = turnOn;
    }

    public addCallback(callback: callback) {
        this._callbacks.push(callback);
    }

    public removeCallback(callback: callback) {
        const index = this._callbacks.indexOf(callback);
        if (index != -1) {
            this._callbacks.splice(index, 1);
        }
    }

    private call() {
        this._callbacks.forEach((callback) => {
            callback();
        });
    }
}
