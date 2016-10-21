import { PIXIApplication } from '../core/PIXIApplication';
import { State } from '../display/State';

export class SoundManager {
    private app: PIXIApplication;
    private lookup: { [id: string]: Howl } = {};

    private _bgTrack: Howl = null;

    constructor() {
        this.app = PIXIApplication.getInstance() as PIXIApplication;
    }

    public add(id: string, howl: Howl): Howl {
        this.lookup[id] = howl;
        return howl;
    }

    public play(id: string, marker: string = null): Howl {
        if (marker) {
            this.lookup[id].play(marker);
        } else {
            this.lookup[id].play();
        }
        return this.lookup[id];
    }

    public loop(id: string): Howl {
        this.lookup[id].loop();
        return this.lookup[id];
    }

    public pause(id: string, marker: string = null): Howl {
        if (marker) {
            this.lookup[id].pause(marker);
        } else {
            this.lookup[id].pause();
        }
        return this.lookup[id];
    }

    public setBgTrack(id: string): Howl {
        this._bgTrack = this.play(id);
        return this._bgTrack;
    }

    public crossFadeBGTrack(to: string, time: number = 300): Howl {
        const oldBgTrack = this._bgTrack;
        this._bgTrack.fade(this._bgTrack.volume(), 0, time);
        this._bgTrack.on('fade', (id) => {
            oldBgTrack.stop();
        });
        const newBgTrack = this.play(to);
        newBgTrack.fade(0, newBgTrack.volume(), time);
        this._bgTrack = newBgTrack
        return newBgTrack;
    }
}