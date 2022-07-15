import PageBuilder from '../common/PageBuilder';

export default class Lobby {
    public start(startGameCallback: () => void) {
        document.body.innerHTML = '';
        const startBtn = <HTMLButtonElement>PageBuilder.createElement('button');
        startBtn.innerHTML = 'START';
        startBtn.style.display = 'fixed';
        startBtn.style.top = '50%';
        startBtn.style.left = '50%';
        startBtn.addEventListener('click', () => {
            startGameCallback();
        });
        document.body.append(startBtn);
    }
}
