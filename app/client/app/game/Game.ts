import Assets from './assets/Assets';

export default class Game {
    static init = async () => {
        await Assets.load();
    };
}
