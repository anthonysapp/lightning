import {Loader} from '../core';
export class Sprite extends PIXI.Sprite {
    constructor(x: number = 0, y: number = 0, atlasId: string | PIXI.Texture = null, textureId:string = null) {
        super(!textureId ? typeof atlasId === 'string' ?  PIXI.Texture.fromImage(atlasId) : atlasId : Loader.getTextureById(atlasId as string, textureId));

        this.x = x;
        this.y = y;
    }
}