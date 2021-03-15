import { Actions } from '../Actions';
import { CommentsState, ReduxAction } from '../Models';

export const Comments = (state: CommentsState = new CommentsState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Comments.GetForFood.Loading: {
            return {
                ...state,
                byFood: {
                    loading: true
                }
            }
        }
        case Actions.Comments.GetForFood.Success: {
            return {
                ...state,
                byFood: {
                    loading: false,
                    [action.subject]: {
                        data: action.data.data
                    }
                }
            }
        }
        case Actions.Comments.ManageVote.Loading: {
            return {
                ...state,
                manageVote: {
                    loading: true
                }
            }
        }
        case Actions.Comments.ManageVote.Success: {
            return {
                ...state,
                manageVote: {
                    loading: false
                }
            }
        }
        default:
            return state;
    }
}