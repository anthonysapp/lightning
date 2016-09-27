import {PIXIApplication} from './PIXIApplication';

export class Camera {
    private app: PIXIApplication;
    private _x: number = 0;
    private _y: number = 0;
    private _position: { x: number; y: number } = { x: 0, y: 0 };

    constructor() {
        this.app = PIXIApplication.getInstance();
    }

    protected setPosition(): void {
        this._position = { x: this._x, y: this._y };
        this.app.updateCamera();
    }

    public shake(speed: number = 0.02, distance: number = 2, times: number = 20): void {
        TweenMax.to(this, speed, { x: "+=" + (distance).toString(), y: "+=" +(distance).toString(), yoyo: true, repeat: times })
    }

    // getter / setter
    set x(value: number) {
        this._x = value;
        this.setPosition();
    }

    get x(): number {
        return this._x;
    }

    set y(value: number) {
        this._y = value;
        this.setPosition();
    }

    get y(): number {
        return this._x;
    }

    set position(value: { x?: number, y?: number }) {
        if (value.x !== undefined) {
            this._x = value.x;
        }

        if (value.x !== undefined) {
            this._y = value.y;
        }

        this.setPosition();
    }

    get position(): { x?: number, y?: number } {
        if (!this._position) {
            this._position = { x: 0, y: 0 };
        }
        return this._position;
    }
}