import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';
import { ManageCommentVoteRequest } from '../Models';

export const GetCommentsForFoodAction = (foodId: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Comments.GetForFood.Loading });
            const comments = await axios.get(Urls.comments.forFood(foodId));
            dispatch({ type: Actions.Comments.GetForFood.Success, subject: foodId, data: comments });
        }
        catch (error) {
            dispatch({ type: Actions.Comments.GetForFood.Failed, data: error });
        }
    }
}

export const ManageCommentVoteAction = (request: ManageCommentVoteRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Comments.ManageVote.Loading })
            await axios.put(Urls.comments.vote(), request);
            dispatch({ type: Actions.Comments.ManageVote.Success })
        }
        catch (error) {
            dispatch({ type: Actions.Comments.ManageVote.Failed, data: error })
        }
    }
}