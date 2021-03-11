import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Textures = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Textures.GetAll.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.Textures.GetAll.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.Textures.GetAll.Failed:
        // TODO: This
        default:
            return state;
    }
}