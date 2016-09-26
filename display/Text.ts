import {PIXIApplication} from '../core';

export class Text extends PIXI.Text {
    constructor(x: number = 0, y: number = 0, text: string = '', font: { fontFamily?: string; fontWeight?: number }, fontSize: number = 26, fontColor: number | string = 0x000000) {
        const style = {
            fontFamily: font.fontFamily || 'Arial',
            fontWeight: font.fontWeight || 400,
            fontSize: fontSize,
            fill: fontColor
        };
        super(text, style, PIXIApplication.getInstance().resolution);
        this.x = x;
        this.y = y;
    }
}