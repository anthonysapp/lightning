import {PIXIApplication} from '../core/PIXIApplication';
import {State} from '../display/State';

export class SoundManager {
    private app: PIXIApplication;
    private lookup: { [id: string]: Howl } = {};

    constructor() {
        this.app = PIXIApplication.getInstance() as PIXIApplication;
    }

    public add(id: string, howl: Howl):Howl {
        this.lookup[id] = howl;
        return howl;
    }

    public play(id: string, marker: string = null): Howl {
        if (marker) {
            return this.lookup[id].play(marker);
        } else {
            return this.lookup[id].play();
        }
    }

    public loop(id: string): Howl {
        this.lookup[id].loop();
        return this.lookup[id];
    }

    public pause(id: string, marker: string = null):Howl {
        if (marker) {
            return this.lookup[id].pause(marker);
        } else {
            return this.lookup[id].pause();
        }
    }
}