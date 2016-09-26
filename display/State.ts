import {PIXIApplication, Factory} from '../core';

export class State extends PIXI.Container {
    public app:PIXIApplication;
    constructor(){
        super();
        this.app = PIXIApplication.getInstance();
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
        return this.app.add;
    }
}