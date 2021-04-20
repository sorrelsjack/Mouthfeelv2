import { ApiData, Comment } from '../Models';
import { ApiOperation } from './ApiOperation';

export class CommentsState {
    create: ApiOperation;

    byFood: ApiData<Comment[]>

    manageVote: {
        loading: boolean
    }

    constructor() {
        this.create = new ApiOperation();
        this.byFood = new ApiData();
        this.manageVote = {
            loading: false
        }
    }
}