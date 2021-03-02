import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Miscellaneous = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.GetAllMiscellaneousLoading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.GetAllMiscellaneousSuccess:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.GetAllMiscellaneousFailed:
        // TODO: This
        default:
            return state;
    }
}