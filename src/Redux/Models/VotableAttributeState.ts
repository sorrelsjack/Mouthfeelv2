import { VotableAttribute } from './VotableAttribute';

export class VotableAttributeState {
    loading: boolean;
    all: VotableAttribute[];

    constructor () {
        this.loading = false;
        this.all = [];
    }
}