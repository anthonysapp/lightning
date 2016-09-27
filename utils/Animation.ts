export class Animation {
    public static generateFrames(framePrefix: string, startFrame: number, endFrame: number): PIXI.Texture[] {
        let frames = [],
            i: number,
            val: string;
        for (i = startFrame; i <= endFrame; i++) {
            val = framePrefix;
            if (i < 10) {
                val += '0';
            }
            if (i < 100) {
                val += '0';
            }
            if (i < 1000) {
                val += '0';
            }
            val += i;
            frames.push(PIXI.Texture.fromFrame(val + '.png'));
        }
        return frames;
    }
}