import {PIXIApplication, Factory, Camera, IUpdateable} from '../core';

export class State extends PIXI.Container implements IUpdateable {
    public app: PIXIApplication;
    public game: PIXI.Container;
    public camera: Camera;

    private _updateable: boolean = false;

    constructor() {
        super();
        this.app = PIXIApplication.getInstance();
        this.game = this.app.game;
        this.camera = this.app.camera;
    }

    public init(): void {

    }

    public preload(): void {

    }

    public build(): void {

    }

    public transitionIn(): void {

    }

    public transitionOut(): void {

    }

    public update(): void {

    }

    public shutdown(): void {

    }

    // getter / setter
    public get add(): Factory {
        return this.app.addToGame;
    }

    public get addToUI(): Factory {
        return this.app.addToUI;
    }


    public get updateable(): boolean {
        return this._updateable;
    }

    public set updateable(value: boolean) {
        this._updateable = value;
    }
}