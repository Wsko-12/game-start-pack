import PageBuilder from '../../../common/PageBuilder';
import './style.scss';

export default class View {
    private _gameScreen: HTMLElement;
    private _canvasContainer: HTMLDivElement;
    private _interfaceContainer: HTMLDivElement;

    constructor() {
        this._gameScreen = <HTMLElement>PageBuilder.createElement('section', {
            classes: 'game-screen',
        });

        this._canvasContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'game-screen__canvas-container',
        });

        this._interfaceContainer = <HTMLDivElement>PageBuilder.createElement('div', {
            classes: 'game-screen__interface-container',
        });
        this._gameScreen.append(this._canvasContainer, this._interfaceContainer);
    }

    public buildToDocument(): void {
        document.body.append(this._gameScreen);
    }

    public appendCanvas(canvas: HTMLCanvasElement) {
        this._canvasContainer?.append(canvas);
    }
}
