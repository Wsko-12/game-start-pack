import { Camera, Raycaster } from 'three';
import { ECustomEvents, EGameMode } from '../../../../ts/enums';
import { ICustomMouseEvent } from '../../../../ts/interfaces';
import World from '../world/World';

export default class IOManager {
    private _mode: EGameMode = EGameMode.freeCam;
    private _world: World;
    private _camera: Camera;
    private _raycaster = new Raycaster();
    private _mainEventsHandler?: HTMLElement;
    constructor(world: World, camera: Camera) {
        this._world = world;
        this._camera = camera;
    }

    public setMainEventsHandler(element: HTMLElement) {
        if (this._mainEventsHandler) {
            this.detachEvents();
        }
        this._mainEventsHandler = element;
        this.attachEvents();
    }

    private detachEvents() {
        return;
    }
    private attachEvents() {
        if (this._mainEventsHandler) {
            this._mainEventsHandler.addEventListener(ECustomEvents.click, this.onClick);
        }
    }

    private onClick = (e: CustomEventInit<ICustomMouseEvent>) => {
        if (e.detail) {
            this._raycaster.setFromCamera(e.detail, this._camera);
            switch (this._mode) {
                case EGameMode.freeCam:
                    {
                        const meshes = this._world.hitboxes.getAll();
                        const intersects = this._raycaster.intersectObjects(meshes);
                        if (intersects.length) {
                            const rayData = intersects[0];
                            this._world.addObject(rayData.point);
                        }
                    }
                    break;
            }
        }
    };
}
