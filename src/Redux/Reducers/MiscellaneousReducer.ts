import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Miscellaneous = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Miscellaneous.GetAll.Loading:
            return { ...state, all: state.all.startLoading() }
        case Actions.Miscellaneous.GetAll.Success:
            return { ...state, all: state.all.succeeded(action.data.data) }
        case Actions.Miscellaneous.GetAll.Failed:
            return { ...state, all: state.all.failed(action.error?.response?.data) }
        default:
            return state;
    }
}