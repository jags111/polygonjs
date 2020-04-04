import { Scene } from 'three/src/scenes/Scene';
import { PolyScene } from '../scene/PolyScene';
import { BaseCameraObjNodeType } from '../nodes/obj/_BaseCamera';
import { CamerasController } from './utils/CamerasController';
import { ControlsController } from './utils/ControlsController';
import { ViewerEventsController } from './utils/EventsController';
import { WebGLController } from './utils/WebglController';
export declare abstract class BaseViewer {
    protected _container: HTMLElement;
    protected _scene: PolyScene;
    protected _display_scene: Scene;
    protected _canvas: HTMLCanvasElement | undefined;
    protected _active: boolean;
    get active(): boolean;
    activate(): void;
    deactivate(): void;
    protected _cameras_controller: CamerasController | undefined;
    get cameras_controller(): CamerasController;
    protected _controls_controller: ControlsController | undefined;
    get controls_controller(): ControlsController;
    protected _events_controller: ViewerEventsController | undefined;
    get events_controller(): ViewerEventsController;
    protected _webgl_controller: WebGLController | undefined;
    get webgl_controller(): WebGLController;
    constructor(_container: HTMLElement, _scene: PolyScene, camera_node: BaseCameraObjNodeType);
    get container(): HTMLElement;
    get scene(): PolyScene;
    get canvas(): HTMLCanvasElement | undefined;
    private _init_from_scene;
    protected abstract _build(): void;
    reset_container_class(): void;
    set_container_class_hovered(): void;
}
