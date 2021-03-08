import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

// TODO: Wondering if we want a VotableAttribute reducer, with flavors, textures, and misc existing on that substate

export const Flavors = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.GetAllFlavors.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.GetAllFlavors.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.GetAllFlavors.Failed:
        // TODO: This
        default:
            return state;
    }
}