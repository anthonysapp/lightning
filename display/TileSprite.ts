import {Loader} from '../core';

export class TileSprite extends PIXI.extras.TilingSprite {
    constructor(x: number = 0, y: number = 0, atlasId: string = null, textureId: string = null, width: number = 0, height: number = 0) {
        super(!textureId ? PIXI.Texture.fromImage(atlasId) : Loader.getTextureById(atlasId, textureId), width, height);
        this.x = x;
        this.y = y;
    }
}