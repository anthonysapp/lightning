export class MovieClip extends PIXI.extras.MovieClip {
    constructor(x: number = 0, y: number = 0, frames: PIXI.Texture[]) {
        super(frames);
        this.x = x;
        this.y = y;
    }
}