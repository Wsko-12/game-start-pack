import GameManager from './game/GameManager';
import Lobby from './lobby/Lobby';
import './common.scss';

export default class App {
    private _lobby = new Lobby();
    private _game = new GameManager();

    public start(): void {
        this._lobby.start(() => {
            document.body.innerHTML = '';
            this._game.start();
        });
    }
}
