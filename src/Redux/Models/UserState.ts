import { VotableAttribute } from './VotableAttribute';

// TODO: Get this the way it's supposed to be
export class UserState {
    // register
    // auth
    loading: boolean;
    all: VotableAttribute[];

    constructor () {
        this.loading = false;
        this.all = [];
    }
}