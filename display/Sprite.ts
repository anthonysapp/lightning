import {Loader} from '../core';
export class Sprite extends PIXI.Sprite {
    constructor(x: number = 0, y: number = 0, atlasId: string = null, textureId:string = null) {
        super(!textureId ? PIXI.Texture.fromImage(atlasId) : Loader.getTextureById(atlasId, textureId));

        this.x = x;
        this.y = y;
    }
}