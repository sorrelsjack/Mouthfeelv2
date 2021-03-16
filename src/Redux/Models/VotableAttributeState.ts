import { VotableAttribute } from './VotableAttribute';
import { ApiData } from '.';

export class VotableAttributeState {
    all: ApiData<VotableAttribute[]>;

    constructor () {
        this.all = new ApiData<VotableAttribute[]>();
    }
}