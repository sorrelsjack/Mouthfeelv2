import { Comment } from '../Models';

export class CommentsState {
    byFood: {
        loading: boolean,
        [foodId: number]: Comment[]
    }
    manageVote: {
        loading: boolean
    }

    constructor() {
        this.byFood = {
            loading: false
        };
        this.manageVote = {
            loading: false
        }
    }
}