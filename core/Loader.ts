import {PIXIApplication} from './PIXIApplication';

export interface ILoaderResource {
    id: string;
    url: string;
    hdurl?: string;
}

export interface ISoundResource extends IHowlProperties {
    extensions?: string[];
    id: string;
}

export class Loader {
    public static DEFAULT_SOUND_PERCENTAGE: number = 5;
    private static HOWLER_DEFAULT_RESOURCE: IHowlProperties = { src: null, autoplay: false, loop: false, volume: 1.0 };
    private app: PIXIApplication;

    public percent: number = 0;
    public hasResources: boolean = false;
    public hasSoundResources: boolean = false;
    public numSounds: number = 0;
    public loaderProgress: number = 0;

    constructor() {
        this.app = PIXIApplication.getInstance();

        PIXI.loader.on('progress', this.onLoadProgress, this);
        PIXI.loader.on('complete', this.onLoadComplete, this);
    }

    public load(resource: ILoaderResource) {
        PIXI.loader.add(resource.id, this.getResolutionBasedUrl(resource));
        this.hasResources = true;
    }

    public loadSound(resource: ISoundResource) {
        this.hasResources = true;
        this.hasSoundResources = true;
        this.numSounds++;
        let res: any = resource;
        if (resource.extensions != null && resource.extensions !== undefined) {

            let src: string = resource.src;
            if (res.src.indexOf('.') > 0) {
                const aSrc = res.src.split('.');
                const ext = aSrc.pop();
                src = aSrc.join('');
            }
            let srclist = [];
            resource.extensions.forEach((extension) => {
                const url = src + '.' + extension;
                if (srclist.indexOf(url) === -1) {
                    srclist.push(url);
                }
            });
            res.src = srclist;
        }
        res.onload = () => {
            this.onSoundLoadComplete();
        }
        this.app.sound.add(res.id, new Howl(res));
    }

    public start() {
        PIXI.loader.load();
    }

    protected onLoadProgress(loader: PIXI.loaders.Loader, resource?: PIXI.loaders.Resource): void {
        const progress = loader ? loader.progress : this.loaderProgress;
        this.loaderProgress = progress;
        this.percent = progress - (Loader.DEFAULT_SOUND_PERCENTAGE * this.numSounds);
    }

    protected onLoadComplete(complete): void {
        this.hasResources = false;
        if (this.numSounds === 0) {
            this.app.state.loadComplete();
        }
    }

    protected onSoundLoadComplete(): void {
        this.numSounds--;
        this.onLoadProgress(null);
        if (this.numSounds === 0) {
            this.hasSoundResources = false;
            this.app.state.loadComplete();
        }
    }

    protected getResolutionBasedUrl(resource: ILoaderResource): string {
        if (this.app.resolution === 2) {
            return resource.hdurl || resource.url;
        }
        return resource.url;
    }

    public static getTextureById(atlasId: string, textureId: string): PIXI.Texture {
        return PIXI.loader.resources[atlasId].textures[textureId];
    }
}