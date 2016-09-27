import {PIXIApplication} from './PIXIApplication';

export interface ILoaderResource {
    id: string;
    url: string;
    hdurl?: string;
}

export class Loader {
    private app: PIXIApplication;

    public percent: number = 0;
    public hasResources: boolean = false;

    constructor() {
        this.app = PIXIApplication.getInstance();

        PIXI.loader.on('progress', this.onLoadProgress, this);
        PIXI.loader.on('complete', this.onLoadComplete, this);
    }

    public load(resource: ILoaderResource) {
        PIXI.loader.add(resource.id, this.getResolutionBasedUrl(resource));
        this.hasResources = true;
    }

    public start() {
        PIXI.loader.load();
    }

    protected onLoadProgress(loader, resource): void {
        this.percent = loader.progress;
    }

    protected onLoadComplete(complete): void {
        this.hasResources = false;
        this.app.state.loadComplete();
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