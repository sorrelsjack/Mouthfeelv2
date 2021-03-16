import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Flavors = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Flavors.GetAll.Loading:
            return { ...state, all: state.all.startLoading() }
        case Actions.Flavors.GetAll.Success:
            return { ...state, all: state.all.succeeded(action.data.data) }
        case Actions.Flavors.GetAll.Failed:
            return { ...state, all: state.all.failed(action.error?.response?.data) }
        default:
            return state;
    }
}