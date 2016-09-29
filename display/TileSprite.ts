import {Loader} from '../core';

export class TileSprite extends PIXI.extras.TilingSprite {
    constructor(x: number = 0, y: number = 0, atlasId: string | PIXI.Texture = null, textureId: string = null, width: number = 0, height: number = 0) {
        super(!textureId ? typeof atlasId === 'string' ?  PIXI.Texture.fromImage(atlasId) : atlasId : Loader.getTextureById(atlasId as string, textureId), width, height);
        this.x = x;
        this.y = y;
    }
}