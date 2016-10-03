import {PIXIApplication} from '../core';
import {Text, Sprite, MovieClip, Container, TileSprite} from '../display';

export class Factory {
    constructor(public defaultContainer: PIXI.Container = null) {
    }

    public text(x?: number, y?: number, text?: string, font?: { fontFamily?: string; fontWeight?: number }, fontSize?: number, fontColor?: number, container: PIXI.Container = null): Text {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(new Text(x, y, text, font, fontSize, fontColor)) as Text;
    }

    public sprite(x?: number, y?: number, atlasId?: string | PIXI.Texture, textureId?: string, container: PIXI.Container = null): Sprite {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(new Sprite(x, y, atlasId, textureId)) as Sprite;
    }

    public tileSprite(x?: number, y?: number, atlasId?: string | PIXI.Texture, textureId?: string, width?: number, height?: number, container: PIXI.Container = null): Sprite {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(new TileSprite(x, y, atlasId, textureId, width, height)) as TileSprite;
    }

    public movieClip(x?: number, y?: number, frames?: PIXI.Texture[], container: PIXI.Container = null): MovieClip {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(new MovieClip(x, y, frames)) as MovieClip;
    }

    public container(x?: number, y?: number, container: PIXI.Container = null): Container {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(new Container(x, y)) as Container;
    }

    public existing(existingElement: any, container: PIXI.Container = null): PIXI.DisplayObject {
        if (!container) {
            container = this.defaultContainerInternal;
        }
        return container.addChild(existingElement);
    }

    // private methods
    protected get defaultContainerInternal(): PIXI.Container {
        return this.defaultContainer || PIXIApplication.getInstance().state.currentState;
    }
}