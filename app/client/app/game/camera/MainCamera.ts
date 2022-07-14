import GameCamera from './GameCamera';

export default class MainCamera extends GameCamera {
    private static _instance: MainCamera;
    constructor() {
        super();
        if (!MainCamera._instance) {
            MainCamera._instance = this;
        }
        return MainCamera._instance;
    }
}
