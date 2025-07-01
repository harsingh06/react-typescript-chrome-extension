export class Action {
    constructor(public type: string, public payload?: any) {}

    static create(type: string, payload?: any): Action {
        console.log(`Creating action of type: ${type}`, payload);
        return new Action(type, payload);
    }
}