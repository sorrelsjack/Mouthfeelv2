import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Textures = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Textures.GetAll.Loading:
            return { ...state, all: state.all.startLoading() }
        case Actions.Textures.GetAll.Success:
            return { ...state, all: state.all.succeeded(action.data.data) }
        case Actions.Textures.GetAll.Failed:
            return { ...state, all: state.all.failed(action.error?.response?.data) }
        default:
            return state;
    }
}