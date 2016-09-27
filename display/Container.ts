import {PIXIApplication, IUpdateable} from 'lightning/core';

export class Container extends PIXI.Container implements IUpdateable {
    protected app: PIXIApplication;
    
    protected _updateable: boolean = true;

    constructor(x: number = 0, y: number = 0) {
        super();
        this.app = PIXIApplication.getInstance();
        this.x = x;
        this.y = y;
    }

    public update(): void {
        // override me
    }

    public get updateable(): boolean {
        return this._updateable;
    }

    public set updateable(value: boolean) {
        this._updateable = value;
    }
}