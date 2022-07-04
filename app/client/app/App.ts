import Assets from './assets/Assets';
import AppView from './view/AppView';

class App {
    private static _instance: App;
    public static get i() {
        return this._instance;
    }

    public assets: Assets = new Assets();
    public view: AppView = new AppView();
    private _started = false;

    constructor() {
        if (App._instance) return App._instance;
        App._instance = this;
        return App._instance;
    }
    start() {
        if (this._started) return;
        this._started = true;
        this.assets.load(() => {
            console.log('[Assets] ', this.assets);
        });
    }
}

export default App;
