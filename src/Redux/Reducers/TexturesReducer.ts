import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

export const Textures = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.GetAllTexturesLoading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.GetAllTexturesSuccess:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.GetAllTexturesFailed:
        // TODO: This
        default:
            return state;
    }
}