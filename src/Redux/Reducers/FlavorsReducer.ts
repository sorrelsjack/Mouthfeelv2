import { Actions } from '../Actions';
import { VotableAttributeState, ReduxAction } from '../Models';

// TODO: Wondering if we want a VotableAttribute reducer, with flavors, textures, and misc existing on that substate

export const Flavors = (state: VotableAttributeState = new VotableAttributeState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Flavors.GetAll.Loading:
            return {
                ...state,
                loading: true,
                all: { ...state.all }
            }
        case Actions.Flavors.GetAll.Success:
            return {
                ...state,
                loading: false,
                all: action.data.data
            }
        case Actions.Flavors.GetAll.Failed:
        // TODO: This
        default:
            return state;
    }
}