import PageBuilder from '../common/PageBuilder';
import Game from '../game/Game';
import './lobby.scss';

export default class Lobby {
    static init() {
        const button = PageBuilder.createElement('button', { classes: ['lobby_button'], content: 'Start' });
        button.addEventListener('click', () => Game.init());
        const container = PageBuilder.createElement('div', { classes: ['lobby_container'], content: [button] });

        document.getElementById('app')?.append(container);
    }
}
