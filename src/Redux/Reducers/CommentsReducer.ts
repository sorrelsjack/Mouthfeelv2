import { Actions } from '../Actions';
import { CommentsState, ReduxAction } from '../Models';

export const Comments = (state: CommentsState = new CommentsState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Comments.Create.Loading:
            return { ...state, create: state.create.startLoading() }
        case Actions.Comments.Create.Success:
            return { ...state, create: state.create.succeeded() }
        case Actions.Comments.Create.Failed:
            return { ...state, create: state.create.failed(action.error?.response?.data) }

        case Actions.Comments.GetForFood.Loading:
            return { ...state, byFood: state.byFood.startLoading() }
        case Actions.Comments.GetForFood.Success:
            return { ...state, byFood: state.byFood.succeeded(action.data.data) }
        case Actions.Comments.GetForFood.Failed:
            return { ...state, byFood: state.byFood.failed(action.error?.response?.data) }

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
        /*
        case Actions.Comments.ManageVote.Success: {
            const { id, votes } = action.data.data;

            let current = state.byFood.data?.find(c => c.id === id) ?? {};
            current.votes = votes;
            const withoutNew = state.byFood.data?.filter(c => c.id !== id);

            return {
                ...state,
                byFood: { ...state.byFood, data: withoutNew?.concat(current) },
                manageVote: {
                    loading: false
                }
            }
        }
        */
        default:
            return state;
    }
}