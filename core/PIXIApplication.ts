import {Application} from 'bolt/mvc';
import {StateManager, Factory} from '../core';


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
    public ui: PIXI.Container;

    // app info
    public resolution: number = 1;

    // management
    public state: StateManager;
    public add: Factory;

    // pixi
    public renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    protected loop: FrameRequestCallback;

    constructor(public config: IPIXIConfig = { width: 1024, height: 768, backgroundColor: 0xffffff, resize: false }) {
        super(false);

        this.startup();
    }

    public startup() {
        console.log('application startup');
        this.createMediator();
        this.setup();
    }

    public addToGame(obj: PIXI.DisplayObject): PIXI.DisplayObject {
        return this.game.addChild(obj);
    }

    public addToUI(obj: PIXI.DisplayObject): PIXI.DisplayObject {
        return this.ui.addChild(obj);
    }

    public static getInstance(): PIXIApplication {
        return Application.getInstance() as PIXIApplication;
    }

    // private methods
    protected createMediator(): void {
    }

    protected setup(): void {
        this.setupInternal();
        this.setupPIXI();
    }

    protected setupInternal(): void {
        this.resolution = window.devicePixelRatio ? window.devicePixelRatio >= 1.5 ? 2 : 1 : 1;
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

        this.ui = this.stage.addChild(new PIXI.Container()) as PIXI.Container;
        this.ui.name = '__ui';
    }

    protected setupApp(): void {
        this.state = new StateManager();
        this.add = new Factory();
    }

    protected addStates(): void {
        // add states for your game here
    }

    protected setupLoop(): void {
        this.loop = this.gameLoop.bind(this);
        this.gameLoop();
    }

    protected update(...containers: PIXI.Container[]): void {
        for (let i = 0; i < containers.length; i++) {
            this.updateInternal(containers[i]);
        }
    }

    protected updateInternal(container: PIXI.Container): void {
        let i = 0,
            child = null;

        if (container['update'] !== undefined && typeof container['update'] === 'function') {
            container['update']();
        }

        if (container.children === undefined || container.children.length === 0) {
            return;
        }

        for (i = 0; i < container.children.length; i++) {
            child = container.children[i];
            if (child.update !== undefined && typeof child.update === 'function') {
                child.update();
            }
            this.updateInternal(child);
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
        return this.renderer.width;
    }

    get height(): number {
        return this.renderer.height;
    }
}