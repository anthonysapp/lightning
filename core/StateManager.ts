import {PIXIApplication} from '../core/PIXIApplication';
import {State} from '../display/State';
export class StateManager {
    private app: PIXIApplication;
    private lookup: { [id: string]: State } = {};
    
    public currentState: State = null;
    public nextState: State = null;

    constructor() {
        this.app = PIXIApplication.getInstance() as PIXIApplication;
    }

    public add(StateClass: typeof State, id: string) {
        if (this.lookup[id] !== undefined) {
            throw ('already has the state:' + id);
        }

        // create state
        const state = this.lookup[id] = new StateClass();
        state.visible = false;

        this.app.game.addChild(state);
    }

    public start(id: string): void {
        this.currentState = this.lookup[id];
        this.bootCurrentState();
    }

    public to(id: string): void {
        if (!this.currentState) {
            throw ('StateManager must be started before "to" can be called');
        }

        this.nextState = this.lookup[id];
        this.currentState.shutdown();
        this.currentState.visible = false;

        // set to next state
        this.currentState = this.nextState;
        this.bootCurrentState();
        
        // nullify nextstate
        this.nextState = null;
    }

    // private methods
    private bootCurrentState():void{
        this.currentState.init();
        this.currentState.preload();
        this.currentState.build();
        this.currentState.visible = true;
    }

}