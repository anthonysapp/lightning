import {PIXIApplication} from '../core';
import {Text} from '../display';

export class Factory {
    public text(x?: number, y?: number, text?: string, font?: { fontFamily?: string; fontWeight?: number }, fontSize?: number, fontColor?: number, container: PIXI.Container = null): Text {
        if (!container) {
            container = PIXIApplication.getInstance().state.currentState;
        }
        return container.addChild(new Text(x, y, text, font, fontSize, fontColor)) as Text;
    }
}