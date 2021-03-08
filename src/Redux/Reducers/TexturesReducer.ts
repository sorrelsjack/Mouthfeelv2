import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Textures = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.GetAllTextures.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.GetAllTextures.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.GetAllTextures.Failed:
        // TODO: This
        default:
            return state;
    }
}