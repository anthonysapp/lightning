import {Loader} from '../core';
export class Rope extends PIXI.mesh.Rope {
    constructor(x: number = 0, y: number = 0, atlasId: string | PIXI.Texture = null, textureId:string = null, points:PIXI.Point[]) {
        super(!textureId ? typeof atlasId === 'string' ?  PIXI.Texture.fromImage(atlasId) : atlasId : Loader.getTextureById(atlasId as string, textureId), points);

        this.x = x;
        this.y = y;
    }
}