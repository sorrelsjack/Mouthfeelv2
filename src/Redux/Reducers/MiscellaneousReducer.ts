import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Miscellaneous = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Miscellaneous.GetAll.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.Miscellaneous.GetAll.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.Miscellaneous.GetAll.Failed:
        // TODO: This
        default:
            return state;
    }
}