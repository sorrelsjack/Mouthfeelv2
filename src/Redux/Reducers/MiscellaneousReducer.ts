import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Miscellaneous = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.GetAllMiscellaneous.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.GetAllMiscellaneous.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.GetAllMiscellaneous.Failed:
        // TODO: This
        default:
            return state;
    }
}