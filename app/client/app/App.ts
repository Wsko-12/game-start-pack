import Assets from './assets/Assets';
import AppView from './view/AppView';

class App {
    private static _instance: App;
    public assets: Assets;
    public static get i() {
        return this._instance;
    }
    public view: AppView;
    private _started: boolean;
    constructor() {
        this.view = new AppView();
        this.assets = new Assets();
        this._started = false;
        if (App._instance) return App._instance;
        App._instance = this;
        return App._instance;
    }
    start() {
        if (this._started) return;
        this._started = true;
        this.assets.load();
    }
}

export default App;
