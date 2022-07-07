import Game from './game/Game';
import AppView from './view/AppView';
import './common.scss';
class App {
    private static _instance: App;
    private _game: Game = new Game();
    public static get i() {
        return this._instance;
    }
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
        this._game.start();
    }
}

export default App;
