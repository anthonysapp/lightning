import {Application} from 'bolt/mvc';
import {StateManager,SoundManager, Factory, Camera, Loader, IUpdateable} from '../core';
import {Container} from '../display';


export interface IPIXIConfig {
    backgroundColor?: number;
    width?: number;
    height?: number;
    resize?: boolean;
}

export class PIXIApplication extends Application {
    // main containers
    public stage: PIXI.Container;
    public game: PIXI.Container;
    public ui: Container;

    // app info
    public resolution: number = 1;


    // camera
    public camera: Camera;

    // management
    public state: StateManager;
    public asset: Loader;
    public sound: SoundManager;
    public addToGame: Factory;
    public addToUI: Factory;

    // pixi
    public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    protected loop: FrameRequestCallback;

    constructor(public config: IPIXIConfig = { width: 1024, height: 768, backgroundColor: 0xffffff, resize: false }) {
        super(false);

        this.startup();
    }

    // get singleton instance
    public static getInstance(): PIXIApplication {
        return Application.getInstance() as PIXIApplication;
    }

    // public methods

    public startup() {
        this.createMediator();
        this.setup();
    }

    public updateCamera(): void {
        this.game.position.set(-this.camera.x, -this.camera.y);
    }

    // private methods
    protected createMediator(): void {
    }

    protected setup(): void {
        this.setupInternal();
        this.setupPIXI();
    }

    protected setupInternal(): void {
        this.resolution =  window.devicePixelRatio ? window.devicePixelRatio >= 1.5 ? 2 : 1 : 1;
    }

    protected setupPIXI(): void {
        this.setupRenderer();
        this.setupStage();
        this.setupApp();
        this.addStates();
        this.setupLoop();
    }

    protected setupRenderer(): void {
        const config = this.config;

        this.renderer = new PIXI.WebGLRenderer(config.width || 1024, config.height || 768, { backgroundColor: config.backgroundColor || 0xffffff, antialias: true, resolution: this.resolution });
        this.renderer.autoResize = config.resize;

        if (config.resize) {
            window.addEventListener('resize', () => this.resize(), true);
            this.resize();
        }

        document.body.appendChild(this.renderer.view);
    }

    protected resize(): void {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    protected setupStage(): void {
        this.stage = new PIXI.Container();

        this.game = this.stage.addChild(new PIXI.Container()) as PIXI.Container;
        this.game.name = '__game';

        this.ui = this.stage.addChild(new Container()) as Container;
        this.ui.name = '__ui';
    }

    protected setupApp(): void {
        this.camera = new Camera();
        this.asset = new Loader();
        this.sound = new SoundManager();
        this.state = new StateManager();

        this.addToGame = new Factory();
        this.addToUI = new Factory(this.ui);
    }

    protected addStates(): void {
        // add states for your game here
    }

    protected setupLoop(): void {
        this.loop = this.gameLoop.bind(this);
        this.gameLoop();
    }

    protected update(...containers: IUpdateable[]): void {
        for (let i = 0; i < containers.length; i++) {
            this.updateInternal(containers[i]);
        }
    }

    protected updateInternal(container: IUpdateable): void {
        if (container.updateable) {
            container.update();
        }
    }

    protected gameLoop(): void {
        requestAnimationFrame(this.loop);
        // update all added stuff
        this.update(this.ui, this.state.currentState);
        this.renderer.render(this.stage);
    }

    // getter / setter
    get width(): number {
        return this.renderer.width / this.resolution;
    }

    get height(): number {
        return this.renderer.height / this.resolution;
    }
}