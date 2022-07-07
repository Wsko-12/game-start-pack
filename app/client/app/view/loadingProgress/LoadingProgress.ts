import AppView from '../AppView';
import './style.scss';

class LoadingProgress {
    private static _instance: LoadingProgress;
    public static get i() {
        return this._instance;
    }

    private _autoClear = true;
    private _max = 0;
    private _element: HTMLElement | undefined;

    constructor() {
        if (LoadingProgress._instance) return LoadingProgress._instance;
        LoadingProgress._instance = this;
    }

    private createElement() {
        const builder = new AppView().createElement;
        const element = builder('div', {
            id: 'loadingScreen',
        });
        const overlay = builder('div', {
            classes: 'loading__overlay',
        });
        element.append(overlay);

        const progressContainer = builder('div', {
            classes: 'loading__progress-container',
        });
        overlay.append(progressContainer);

        const progressBar = builder('div', {
            classes: 'loading__progress',
        });
        progressContainer.append(progressBar);

        return element;
    }

    start(max: number, autoClear = true): LoadingProgress {
        this.clear();
        this._autoClear = autoClear;
        this._max = max;
        this._element = this.createElement();
        document.body.append(this._element);
        return this;
    }
    tick(currentValue: number) {
        if (currentValue >= this._max && this._autoClear) {
            this.clear();
            return;
        }
        const process = (currentValue / this._max) * 100;
        const progressBar = document.querySelector('#loadingScreen .loading__progress') as HTMLElement;
        progressBar.style.width = process + '%';
    }

    clear() {
        this._max = 0;
        this._element?.remove();
    }
}
export default LoadingProgress;
