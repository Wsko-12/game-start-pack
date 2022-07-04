import LoadingProgress from './loadingProgress/LoadingProgress';

interface createElementProps {
    element: 'div' | 'span' | 'button';
    classes?: string[] | string | null;
    id?: string | null;
}

class AppView {
    private static _instance: AppView;
    public static get i() {
        return this._instance;
    }

    public loadingProgress: LoadingProgress = new LoadingProgress();

    constructor() {
        if (AppView._instance) return AppView._instance;
        AppView._instance = this;
    }
    public createElement(properties: createElementProps): HTMLElement {
        const element = document.createElement(properties.element) as HTMLElement;
        if (properties.classes) {
            if (typeof properties.classes === 'string') {
                element.classList.add(properties.classes);
            } else {
                element.classList.add(...properties.classes);
            }
        }
        if (properties.id) {
            element.id = properties.id;
        }
        return element;
    }
}

export default AppView;
